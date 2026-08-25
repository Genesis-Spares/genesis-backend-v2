// test-redis-cloud.ts
import Redis from 'ioredis';

async function testRedisCloud() {
    console.log('🔍 Testing Redis Cloud connection...');
    console.log('========================================\n');

    // ✅ Correct Redis configuration - removed invalid options
    const redis = new Redis({
        host: 'redis-18652.c82.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18652,
        password: 'bODMzWTzrNB5AIW3RO15iz4JiqnS4ubC',
        connectTimeout: 10000,
        // Try WITHOUT TLS first
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
        console.log(`   Redis Version: ${await redis.info('server').then(info => {
            const match = info.match(/redis_version:(\d+\.\d+\.\d+)/);
            return match ? match[1] : 'unknown';
        })}`);

        // Test pub/sub
        console.log('\n📤 Testing pub/sub...');
        const channel = 'test-channel';
        const message = 'Hello from Genesis!';

        // Create a subscriber
        const subscriber = new Redis({
            host: 'redis-18652.c82.us-east-1-2.ec2.cloud.redislabs.com',
            port: 18652,
            password: 'bODMzWTzrNB5AIW3RO15iz4JiqnS4ubC',
        });

        // Subscribe and wait for message
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout - no message received'));
            }, 5000);

            subscriber.subscribe(channel, (err, count) => {
                if (err) {
                    clearTimeout(timeout);
                    reject(err);
                    return;
                }
                console.log(`   Subscribed to ${channel} (${count} subscribers)`);
            });

            subscriber.on('message', (ch, msg) => {
                clearTimeout(timeout);
                console.log(`📥 Received message: ${msg}`);
                subscriber.unsubscribe(channel);
                subscriber.disconnect();
                resolve(true);
            });

            // Publish after subscription is ready
            setTimeout(async () => {
                const published = await redis.publish(channel, message);
                console.log(`   Published to ${channel}: ${published} subscribers`);
            }, 500);
        });

        console.log('✅ Pub/sub test successful!');

        // Clean up
        redis.disconnect();

        console.log('\n========================================');
        console.log('✅ All Redis Cloud tests passed!');

    } catch (error) {
        console.error('\n❌ Redis Cloud connection failed!');
        console.error(`   Error: ${error.message}`);
        if (error.code) {
            console.error(`   Code: ${error.code}`);
        }
        
        console.log('\n💡 Try with TLS enabled by uncommenting tls in the config');
        console.log('   Or check if the Redis Cloud instance is accessible');
        
        process.exit(1);
    }
}

testRedisCloud();
