'use client';

import { useState, useCallback } from 'react';
import Button from './Button';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: 集成实际的表单提交API
      // 模拟成功提交
      setSubmitStatus('success');
      // 重置表单
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch {
      // 错误处理
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <div className={`w-full max-w-lg ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 姓名字段 */}
        <div className="">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Your full name"
            required
            className="w-full text-lg lg:text-xl text-text-brand placeholder-text-display bg-transparent border-0 border-b border-neutral-300 focus:border-fill-brand focus:outline-none pb-2 pl-2.5 transition-colors duration-200"
          />
        </div>

        {/* 邮箱字段 */}
        <div className="">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-mail"
            required
            className="w-full text-lg lg:text-xl text-text-brand placeholder-text-display bg-transparent border-0 border-b border-neutral-300 focus:border-lime-600 focus:outline-none pb-2 pl-2.5 transition-colors duration-200"
          />
        </div>

        {/* 电话字段 */}
        <div className="">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Tel"
            required
            className="w-full text-lg lg:text-xl text-text-brand placeholder-text-display bg-transparent border-0 border-b border-neutral-300 focus:border-lime-600 focus:outline-none pb-2 pl-2.5 transition-colors duration-200"
          />
        </div>

        {/* 公司字段 */}
        <div className="">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company"
            required
            className="w-full text-lg lg:text-xl text-text-brand placeholder-text-display bg-transparent border-0 border-b border-neutral-300 focus:border-lime-600 focus:outline-none pb-2 pl-2.5 transition-colors duration-200"
          />
        </div>

        {/* 消息字段 */}
        <div className="">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            required
            rows={4}
            className="w-full text-lg lg:text-xl text-text-brand placeholder-text-display bg-transparent border border-neutral-300 focus:border-lime-600 focus:outline-none pb-2 pt-2 pl-2.5 transition-colors duration-200 resize-none"
          />
        </div>

        {/* 提交状态消息 */}
        {submitStatus === 'success' && (
          <div className="text-green-600 text-sm">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-red-600 text-sm">
            Sorry, there was an error sending your message. Please try again.
          </div>
        )}

        {/* 提交按钮 */}
        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className=""
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
}