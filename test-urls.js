/**
 * Test script for URL utilities
 */
import { getBaseUrl, getVerificationUrl, getQrCodeBaseUrl } from './lib/utils/url';

console.log('=== URL Utility Test ===');
console.log('Base URL:', getBaseUrl());
console.log('QR Code Base URL:', getQrCodeBaseUrl());
console.log('Verification URL for test123:', getVerificationUrl('test123'));
console.log('========================');
