// test-redis-cloud.ts
import Redis from 'ioredis';

async function testRedisCloud() {
    console.log('🔍 Testing Redis Cloud connection...');
    console.log('========================================\n');

    // Try without TLS first
    const redis = new Redis({
        host: 'redis-18652.c82.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18652,
        password: 'bODMzWTzrNB5AIW3RO15iz4JiqnS4ubC',
        retryAttempts: 3,
        retryDelay: 1000,
        connectTimeout: 10000,
        // ⚠️ Try WITHOUT TLS first
        // tls: {
        //     rejectUnauthorized: false,
        // },
    });

    try {
        // Test connection
        console.log('📡 Connecting to Redis Cloud...');
        const pong = await redis.ping();
        console.log('✅ Redis Cloud connection successful!');
        console.log(`   Response: ${pong}`);

        // Test pub/sub
        console.log('\n📤 Testing pub/sub...');
        const channel = 'test-channel';
        const message = 'Hello from Genesis!';

        // Publish test message
        const published = await redis.publish(channel, message);
        console.log(`   Published to ${channel}: ${published} subscribers`);

        // Subscribe to test
        const subscriber = new Redis({
            host: 'redis-18652.c82.us-east-1-2.ec2.cloud.redislabs.com',
            port: 18652,
            password: 'bODMzWTzrNB5AIW3RO15iz4JiqnS4ubC',
        });

        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout - no message received'));
            }, 5000);

            subscriber.subscribe(channel);
            subscriber.once('message', (ch, msg) => {
                clearTimeout(timeout);
                console.log(`📥 Received message: ${msg}`);
                resolve(true);
            });

            // Publish after subscription is ready
            setTimeout(async () => {
                await redis.publish(channel, 'Test message');
            }, 500);
        });

        console.log('✅ Pub/sub test successful!');

        // Clean up
        await subscriber.unsubscribe(channel);
        subscriber.disconnect();
        redis.disconnect();

        console.log('\n========================================');
        console.log('✅ All Redis Cloud tests passed!');

    } catch (error) {
        console.error('\n❌ Redis Cloud connection failed!');
        console.error(`   Error: ${error.message}`);
        if (error.code) {
            console.error(`   Code: ${error.code}`);
        }
        
        console.log('\n💡 Try with TLS enabled:');
        console.log('   Add tls: { rejectUnauthorized: false } to the config');
        
        process.exit(1);
    }
}

testRedisCloud();
