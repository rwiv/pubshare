import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import './globals.css'
import {MainPage} from "@/pages/MainPage.tsx";
import {LoginPage} from "@/pages/account/LoginPage.tsx";
import {AccountListPage} from "@/pages/account/AccountListPage.tsx";
import {RoleListPage} from "@/pages/permission/RoleListPage.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/accounts', element: <AccountListPage /> },
  { path: '/roles', element: <RoleListPage /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <RouterProvider router={router} />
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
