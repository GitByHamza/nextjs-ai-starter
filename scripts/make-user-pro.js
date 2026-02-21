const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually since we are in a standalone script
const envPath = path.resolve(__dirname, '../.env.local');
let env = {};
try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        // Skip empty lines and comments
        if (!trimmedLine || trimmedLine.startsWith('#')) return;

        // Find the first equals sign
        const separatorIndex = trimmedLine.indexOf('=');
        if (separatorIndex === -1) return;

        const key = trimmedLine.substring(0, separatorIndex).trim();
        let value = trimmedLine.substring(separatorIndex + 1).trim();

        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length - 1);
        }

        env[key] = value;
    });
} catch (e) {
    console.error('Could not load .env.local file', e);
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const email = process.argv[2];

if (!email) {
    console.error('\nUsage: node scripts/make-user-pro.js <your_email>');
    process.exit(1);
}

async function main() {
    console.log(`\n🔍 Looking for user: ${email}...`);

    // 1. Find User ID from Auth (requires Service Role Key)
    // Note: listUsers() is paginated, but for dev purposes default 50 is usually fine.
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers({ perPage: 1000 });

    if (userError) {
        console.error('❌ Error listing users:', userError.message);
        return;
    }

    const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
        console.error('❌ User not found in Auth system.');
        console.log('   -> Make sure you have signed up in the app first!');
        return;
    }

    console.log(`   Found User ID: ${user.id}`);

    // 2. Upsert Profile (Create if missing, Update if exists)
    console.log('🔄 Updating profile...');
    const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            email: email,
            is_pro: true,
            credits: 100,
        })
        .select()
        .single();

    if (updateError) {
        console.error('❌ Error updating profile:', updateError.message);
        console.error('   Hint: Did you create the "profiles" table in Supabase SQL Editor?');
    } else {
        console.log('✅ Success! User is now PRO with 100 credits.');
        console.log('   -> Refresh your dashboard to see the changes.');
    }
}

main();
