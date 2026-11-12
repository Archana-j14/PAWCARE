import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { authenticate } from './server/auth.js';
import { authRouter } from './server/routes/authRoutes.js';
import { petRouter } from './server/routes/petRoutes.js';
import { doctorRouter } from './server/routes/doctorRoutes.js';
import { appointmentRouter } from './server/routes/appointmentRoutes.js';
import { healthConsultationRouter } from './server/routes/healthConsultationRoutes.js';
import { soundRouter } from './server/routes/soundRoutes.js';
import { behaviourCareNutritionRouter } from './server/routes/behaviourCareNutritionRoutes.js';
import { environmentalRouter } from './server/routes/environmentalRoutes.js';
import { notificationRouter } from './server/routes/notificationRoutes.js';
import { adminRouter } from './server/routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Authentication session middleware
app.use(authenticate);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/pets', petRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/health', healthConsultationRouter);
app.use('/api/sound', soundRouter);
app.use('/api/activity', behaviourCareNutritionRouter);
app.use('/api/environmental', environmentalRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/admin', adminRouter);

// Module route aliases for direct access
app.use('/api/behaviour', (req, res, next) => {
  req.url = '/behaviour' + (req.url === '/' ? '' : req.url);
  behaviourCareNutritionRouter(req, res, next);
});
app.use('/api/nutrition', (req, res, next) => {
  req.url = '/nutrition' + (req.url === '/' ? '' : req.url);
  behaviourCareNutritionRouter(req, res, next);
});
app.use('/api/reminders', (req, res, next) => {
  req.url = '/reminders' + (req.url === '/' ? '' : req.url);
  behaviourCareNutritionRouter(req, res, next);
});
app.use('/api/care-schedule', (req, res, next) => {
  req.url = '/reminders' + (req.url === '/' ? '' : req.url);
  behaviourCareNutritionRouter(req, res, next);
});
app.use('/api/clinics', (req, res, next) => {
  req.url = '/clinics' + (req.url === '/' ? '' : req.url);
  behaviourCareNutritionRouter(req, res, next);
});

// Health check endpoint
app.get('/api/healthcheck', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// IMPORTANT: Unhandled API requests MUST always return JSON 404, NEVER fall through to Vite SPA html
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `API route ${req.method} ${req.originalUrl} not found.` });
});

// Global API error handler to guarantee JSON error output
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api/')) {
    console.error('[API Error]:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
    return;
  }
  next(err);
});

// Vite Middleware integration for development
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PawCare] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[PawCare] Server initialization error:', err);
  process.exit(1);
});
