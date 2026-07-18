import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #2a2a2a',
          },
        }}
      />
    </>
  );
}

export default App;