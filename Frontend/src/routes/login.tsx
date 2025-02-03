import { createFileRoute } from '@tanstack/react-router';
import Login from '../pages/login';

export const Route = createFileRoute('/login')({
  component: Login,
  validateSearch: (search: Record<string, unknown>) => ({
    success: search.success === true ? true : undefined,
  }),
});
