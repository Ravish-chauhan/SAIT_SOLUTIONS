import mongoose from 'mongoose';

const LOCAL_URI = 'mongodb://127.0.0.1:27017/sait_solutions';

async function migrateData(targetAtlasUri: string) {
  if (!targetAtlasUri || targetAtlasUri.includes('<db_password>')) {
    console.error('❌ Please provide a valid MongoDB Atlas URI with the password replaced.');
    process.exit(1);
  }

  console.log('🔄 Connecting to Local MongoDB...');
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log('✅ Connected to Local MongoDB');

  if (!localConn.db) {
    throw new Error('Local database connection failed');
  }

  // Fetch all collections from local database
  const collections = await localConn.db.collections();
  console.log(`Found ${collections.length} collections in local database:`);

  const localData: Record<string, any[]> = {};
  for (const col of collections) {
    const name = col.collectionName;
    if (name.startsWith('system.')) continue;
    const docs = await col.find({}).toArray();
    localData[name] = docs;
    console.log(`- ${name}: ${docs.length} documents`);
  }

  await localConn.close();

  console.log('\n🔄 Connecting to Production MongoDB Atlas...');
  const targetConn = await mongoose.createConnection(targetAtlasUri).asPromise();
  console.log('✅ Connected to MongoDB Atlas');

  if (!targetConn.db) {
    throw new Error('Target database connection failed');
  }

  for (const [colName, docs] of Object.entries(localData)) {
    if (docs.length === 0) continue;
    const targetCol = targetConn.db.collection(colName);

    console.log(`\nCopying ${docs.length} documents into "${colName}"...`);
    for (const doc of docs) {
      await targetCol.updateOne(
        { _id: doc._id },
        { $set: doc },
        { upsert: true }
      );
    }
    console.log(`✅ Successfully synced ${colName} to Atlas!`);
  }

  await targetConn.close();
  console.log('\n🎉 Migration to MongoDB Atlas completed successfully!');
}

const atlasUriArg = process.argv[2];
migrateData(atlasUriArg).catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
