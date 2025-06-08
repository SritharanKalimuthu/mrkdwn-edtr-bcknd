export default function resetPasswordTemplate(resetURL, toEmail, name) {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <title>Reset Your Password</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #1a1a1a;
                line-height: 1.6;
                padding: 20px 0;
                min-height: 100vh;
            }
            
            .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .email-header {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .email-header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: shimmer 3s ease-in-out infinite;
            }
            
            @keyframes shimmer {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(180deg); }
            }
            
            .lock-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 2;
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .lock-icon svg {
                width: 40px;
                height: 40px;
                fill: white;
            }
            
            .email-header h1 {
                color: white;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                position: relative;
                z-index: 2;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .email-header p {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                margin-top: 8px;
                font-weight: 400;
                position: relative;
                z-index: 2;
            }
            
            .email-body {
                padding: 40px 30px;
                background: white;
            }
            
            .greeting {
                font-size: 18px;
                color: #374151;
                margin-bottom: 25px;
                font-weight: 500;
            }
            
            .message {
                font-size: 16px;
                color: #6b7280;
                margin-bottom: 35px;
                line-height: 1.7;
            }
            
            .reset-button {
                display: inline-block;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 16px;
                text-align: center;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
                border: none;
                cursor: pointer;
                margin: 20px 0;
                position: relative;
                overflow: hidden;
            }
            
            .reset-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }
            
            .reset-button:hover::before {
                left: 100%;
            }
            
            .reset-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
            }
            
            .button-wrapper {
                text-align: center;
                margin: 30px 0;
            }
            
            .security-notice {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border: 1px solid #f59e0b;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                position: relative;
            }
            
            .security-notice::before {
                content: '⚠️';
                font-size: 20px;
                position: absolute;
                top: 20px;
                left: 20px;
            }
            
            .security-notice-content {
                margin-left: 35px;
            }
            
            .security-notice h3 {
                color: #92400e;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .security-notice p {
                color: #b45309;
                font-size: 14px;
                margin: 0;
                line-height: 1.5;
            }
            
            .expiry-info {
                background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                border: 1px solid #3b82f6;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
            }
            
            .expiry-info .time-left {
                font-size: 24px;
                font-weight: 700;
                color: #1d4ed8;
                margin-bottom: 5px;
            }
            
            .expiry-info .time-label {
                color: #3730a3;
                font-size: 14px;
                font-weight: 500;
            }
            
            .alternative-text {
                margin-top: 25px;
                padding: 20px;
                background: #f9fafb;
                border-radius: 12px;
                border-left: 4px solid #6366f1;
            }
            
            .alternative-text p {
                font-size: 14px;
                color: #6b7280;
                margin: 0;
                line-height: 1.6;
            }
            
            .alternative-text code {
                background: #e5e7eb;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Monaco', 'Consolas', monospace;
                font-size: 13px;
                color: #374151;
                word-break: break-all;
            }
            
            .email-footer {
                background: #f8fafc;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }
            
            .footer-content {
                max-width: 400px;
                margin: 0 auto;
            }
            
            .company-info {
                margin-bottom: 20px;
            }
            
            .company-name {
                font-size: 18px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 5px;
            }
            
            .company-tagline {
                font-size: 14px;
                color: #9ca3af;
            }
            
            .social-links {
                margin: 20px 0;
            }
            
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #6b7280;
                text-decoration: none;
                font-size: 14px;
                transition: color 0.3s ease;
            }
            
            .social-links a:hover {
                color: #6366f1;
            }
            
            .copyright {
                font-size: 12px;
                color: #9ca3af;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
            }
            
            /* Mobile Responsiveness */
            @media only screen and (max-width: 600px) {
                body {
                    padding: 10px 0;
                }
                
                .email-wrapper {
                    margin: 0 10px;
                    border-radius: 16px;
                }
                
                .email-header {
                    padding: 30px 20px;
                }
                
                .email-header h1 {
                    font-size: 24px;
                }
                
                .lock-icon {
                    width: 60px;
                    height: 60px;
                }
                
                .lock-icon svg {
                    width: 30px;
                    height: 30px;
                }
                
                .email-body, .email-footer {
                    padding: 30px 20px;
                }
                
                .reset-button {
                    padding: 14px 28px;
                    font-size: 15px;
                    width: 100%;
                    max-width: 280px;
                }
                
                .security-notice, .expiry-info, .alternative-text {
                    padding: 15px;
                }
                
                .security-notice-content {
                    margin-left: 30px;
                }
            }
            
            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                .email-body {
                    background: #1f2937;
                    color: #f9fafb;
                }
                
                .greeting {
                    color: #f3f4f6;
                }
                
                .message {
                    color: #d1d5db;
                }
                
                .alternative-text {
                    background: #374151;
                    border-left-color: #8b5cf6;
                }
                
                .alternative-text p {
                    color: #d1d5db;
                }
                
                .alternative-text code {
                    background: #4b5563;
                    color: #f3f4f6;
                }
                
                .email-footer {
                    background: #111827;
                    border-top-color: #374151;
                }
                
                .company-name {
                    color: #f3f4f6;
                }
                
                .company-tagline, .copyright {
                    color: #9ca3af;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <!-- Header Section -->
            <div class="email-header">
                <div class="lock-icon">
                    🗝️
                </div>
                <h1>Password Reset Request</h1>
                <p>Secure access to your account</p>
            </div>
            
            <!-- Body Section -->
            <div class="email-body">
                <div class="greeting">
                    Hello <strong>${name}</strong>,
                </div>
                
                <div class="message">
                    We received a request to reset the password for your account associated with <strong>${toEmail}</strong>. If you made this request, click the button below to create a new password.
                </div>
                
                <!-- Reset Button -->
                <div class="button-wrapper">
                    <a href="${resetURL}" class="reset-button">
                        Reset My Password
                    </a>
                </div>
                
                <!-- Expiry Information -->
                <div class="expiry-info">
                    <div class="time-left">15 Minutes</div>
                    <div class="time-label">Time remaining to reset</div>
                </div>
                
                <!-- Security Notice -->
                <div class="security-notice">
                    <div class="security-notice-content">
                        <h3>Security Notice</h3>
                        <p>If you didn't request this password reset, please ignore this email or contact our support team immediately. Your account remains secure.</p>
                    </div>
                </div>
                
                <!-- Alternative Method -->
                <div class="alternative-text">
                    <p><strong>Having trouble with the button?</strong></p>
                    <p>Copy and paste this link into your browser:</p>
                    <p><code>${resetURL}</code></p>
                </div>
            </div>
            
            <!-- Footer Section -->
            <div class="email-footer">
                <div class="footer-content">
                    <div class="company-info">
                        <div class="company-name">@MDEditor</div>
                        <div class="company-tagline">Empowering your digital experience</div>
                    </div>
                    
                    <div class="social-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Contact Support</a>
                    </div>
                    
                    <div class="copyright">
                        &copy; ${new Date().getFullYear()} @MDEditor. All rights reserved.<br>
                        This email was sent to ${toEmail}
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}
