import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../../fixtures/all_api_endpoints';
import { Config } from '../../config/env';

test.describe('Admin Login API Tests', () => {
  const validCredentials = { email: Config.API_EMAIL, password: Config.API_PASSWORD };
  const headers = { 'Content-Type': 'application/json' };

  test.describe('Successful Login', () => {
    test('Should login with valid credentials and return tokens', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: validCredentials,
        headers
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('access');
      expect(body).toHaveProperty('refresh');
      expect(body.access).toBeTruthy();
      expect(body.refresh).toBeTruthy();
      expect(typeof body.access).toBe('string');
      expect(typeof body.refresh).toBe('string');
    });

    test('Should return valid JWT tokens', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: validCredentials,
        headers
      });

      const body = await response.json();
      const jwtPattern = /^[\w-]+\.[\w-]+\.[\w-]+$/;
      
      expect(body.access).toMatch(jwtPattern);
      expect(body.refresh).toMatch(jwtPattern);
    });
  });

  test.describe('Failed Login', () => {
    test('Should fail with invalid email', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: { email: 'invalid@example.com', password: Config.API_PASSWORD },
        headers
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body).toHaveProperty('non_field_errors');
    });

    test('Should fail with invalid password', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: { email: Config.API_EMAIL, password: 'WrongPassword123!' },
        headers
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body).toHaveProperty('non_field_errors');
    });

    test('Should fail with empty credentials', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: { email: '', password: '' },
        headers
      });

      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(response.status()).toBeLessThan(500);
    });

    test('Should fail with missing email', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: { password: Config.API_PASSWORD },
        headers
      });

      expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('Should fail with missing password', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: { email: Config.API_EMAIL },
        headers
      });

      expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('Should fail with malformed email', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: { email: 'not-an-email', password: Config.API_PASSWORD },
        headers
      });

      expect(response.status()).toBeGreaterThanOrEqual(400);
    });
  });

  test.describe('API Response Validation', () => {
    test('Should have correct response headers', async ({ request }) => {
      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: validCredentials,
        headers
      });

      expect(response.headers()['content-type']).toContain('application/json');
    });

    test('Should complete within acceptable time', async ({ request }) => {
      const startTime = Date.now();

      const response = await request.post(API_ENDPOINTS.AUTH.ADMIN.LOGIN, {
        data: validCredentials,
        headers
      });

      const responseTime = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(3000);
    });
  });
});