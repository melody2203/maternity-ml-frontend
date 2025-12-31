const axios = require('axios');

// Test backend connection
async function testBackend() {
    console.log('Testing backend connection...\n');

    // Test 1: Check if backend is running
    try {
        const healthCheck = await axios.get('https://maternity-ml-backend-4.onrender.com/');
        console.log('✅ Backend is running!');
        console.log('Response:', healthCheck.data);
        console.log('');
    } catch (error) {
        console.log('❌ Backend health check failed:', error.message);
        return;
    }

    // Test 2: Test prediction endpoint with sample data
    try {
        const testData = {
            Age: 28,
            SystolicBP: 120,
            DiastolicBP: 80,
            BS: 95,
            BodyTemp: 98.6,
            HeartRate: 75,
            MaternityMonth: 6
        };

        console.log('Testing prediction endpoint with data:', testData);

        const response = await axios.post(
            'https://maternity-ml-backend-4.onrender.com/predict/logistic',
            testData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Prediction successful!');
        console.log('Response:', response.data);
        console.log('Risk Level:', response.data.RiskLevel);
    } catch (error) {
        console.log('❌ Prediction failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

testBackend();
