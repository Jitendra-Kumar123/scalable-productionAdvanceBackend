export function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp){
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600" cellspacing="0" cellpadding="0" style="background: #ffffff; margin: 30px auto; border-radius: 10px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: #2563eb; color: white; text-align: center; padding: 20px;">
                            <h1>Your App Name</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <h2>Email Verification</h2>
                            <p>Use the following OTP to verify your account:</p>

                            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb; margin: 20px 0;">
                                {{OTP_CODE}}
                            </div>

                            <p>This OTP will expire in <strong>10 minutes</strong>.</p>

                            <p>If you didn't request this code, please ignore this email.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8f8f8; text-align: center; padding: 15px; color: #666;">
                            © 2026 Your App Name. All rights reserved.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
}