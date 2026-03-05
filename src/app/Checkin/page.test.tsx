import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import CheckinPage from './page';

// Mock Next.js router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

describe('CheckinPage UI Tests', () => {
    it('1. should have the submit button disabled by default', () => {
        render(<CheckinPage />);

        // ค้นหาปุ่มที่มีคำว่า Retrieve Booking
        const submitButton = screen.getByRole('button', { name: /Retrieve Booking/i });

        // ตรวจสอบว่าปุ่มโดน disable ไว้
        expect(submitButton).toBeDisabled();
    });

    it('2. should enable the submit button when Last Name and PNR are filled', () => {
        render(<CheckinPage />);

        // ค้นหาช่องกรอกข้อมูล Last Name และ PNR
        const lastNameInput = screen.getByRole('textbox', { name: /Last Name/i }) || screen.getByLabelText(/Last Name/i);
        // เนื่องจาก PNR มีข้อความใน label ยาว เราสามารถใช้ getByLabelText ได้
        const pnrInput = screen.getByLabelText(/Booking reference \(PNR\)/i) || screen.getByPlaceholderText(/ABC123/i);
        const submitButton = screen.getByRole('button', { name: /Retrieve Booking/i });

        // ทดสอบกรอกแค่ Last Name อย่างเดียว ปุ่มยังต้อง disable
        fireEvent.change(lastNameInput, { target: { value: 'HUUM' } });
        expect(submitButton).toBeDisabled();

        // ทดสอบกรอก PNR สมบูรณ์
        fireEvent.change(pnrInput, { target: { value: 'ABC123' } });

        // หลังจากกรอกครบทั้ง 2 ช่อง ปุ่มต้อง enable
        expect(submitButton).not.toBeDisabled();
    });
});
