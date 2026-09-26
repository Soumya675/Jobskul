import React, { useState } from 'react';
import { PaymentHistoryItem, User } from '../types';
import {
  CreditCard,
  CheckCircle2,
  Download,
  Tag,
  ShieldCheck,
  Sparkles,
  Receipt,
  Clock,
  Printer,
  X
} from 'lucide-react';

interface PaymentsSubscriptionsProps {
  paymentHistory: PaymentHistoryItem[];
  currentUser: User | null;
}

export const PaymentsSubscriptions: React.FC<PaymentsSubscriptionsProps> = ({
  paymentHistory,
  currentUser
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'campus-pass'>('pro');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [activeInvoice, setActiveInvoice] = useState<PaymentHistoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const basePrice = selectedPlan === 'pro' ? 7999 : 12999;
  const discountAmount = couponApplied ? Math.round(basePrice * 0.5) : 0;
  const taxableAmount = basePrice - discountAmount;
  const gst = Math.round(taxableAmount * 0.18);
  const finalTotal = taxableAmount + gst;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'JOBSKUL50' || couponCode.toUpperCase() === 'PLACEMENT2026') {
      setCouponApplied(true);
      setCouponDiscount(50);
      showToast('Coupon JOBSKUL50 applied! 50% discount activated.');
    } else {
      showToast('Invalid coupon code. Try "JOBSKUL50".');
    }
  };

  const handleSimulatePayment = () => {
    showToast(`Payment of ₹${finalTotal.toLocaleString()} processed via Razorpay / UPI!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Banner */}
      <div className="bg-linear-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-geometric-mono font-bold tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-blue-300" />
            <span>TRANSPARENT SUBSCRIPTION & TAX INVOICING</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Jobskül Pro Career Pass & Payment History
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Unlimited access to all 4+ certification courses, AI mock interview engine, live cohorts, downloadable GST tax invoices, and priority corporate partner referrals.
          </p>
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center shrink-0 space-y-1">
          <span className="text-[10px] uppercase font-geometric-mono text-blue-200">Active Membership</span>
          <p className="text-2xl font-black text-white">Jobskül Pro Pass</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold">
            Valid Till Sep 2027
          </span>
        </div>
      </div>

      {/* Plans & Checkout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Plans (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedPlan('pro')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPlan === 'pro'
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                  Most Popular
                </span>
                <h3 className="text-base font-extrabold text-slate-900">Pro Career Pass (1 Year)</h3>
                <p className="text-xs text-slate-500">All certification courses, practice lab IDE, and AI interview chatbot.</p>
                <div className="pt-2">
                  <span className="text-2xl font-black text-slate-900 font-geometric-mono">₹7,999</span>
                  <span className="text-xs text-slate-400 line-through ml-2">₹19,999</span>
                </div>
              </div>

              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>All 4+ Complete Course Tracks</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Unlimited Coding & SQL Lab</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct Partner Drive Applications</span>
                </li>
              </ul>
            </div>

            <div
              onClick={() => setSelectedPlan('campus-pass')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedPlan === 'campus-pass'
                  ? 'bg-purple-50/70 border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                  Elite Guarantee
                </span>
                <h3 className="text-base font-extrabold text-slate-900">Placement Elite (Lifetime)</h3>
                <p className="text-xs text-slate-500">Includes 5x 1-on-1 mentorship sessions and guaranteed corporate interviews.</p>
                <div className="pt-2">
                  <span className="text-2xl font-black text-slate-900 font-geometric-mono">₹12,999</span>
                  <span className="text-xs text-slate-400 line-through ml-2">₹29,999</span>
                </div>
              </div>

              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Everything in Pro Pass</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>5x 1-on-1 Sessions with Ex-Google Mentor</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Guaranteed Corporate Interview Calls</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-geometric-mono flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>Apply Promotion / Campus Coupon</span>
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon (e.g. JOBSKUL50)"
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-geometric-mono font-bold focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponApplied && (
              <p className="text-[11px] font-bold text-emerald-600">
                ✓ Coupon JOBSKUL50 Applied! 50% discount subtracted from cart.
              </p>
            )}
          </div>
        </div>

        {/* Order Summary & Payment Gateway (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-geometric-mono">
            Order & Tax Invoice Breakdown
          </h3>

          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="flex justify-between py-1 text-slate-600">
              <span>{selectedPlan === 'pro' ? 'Pro Career Pass (1 Year)' : 'Placement Elite (Lifetime)'}</span>
              <span className="font-geometric-mono font-bold text-slate-900">₹{basePrice.toLocaleString()}</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between py-1 text-emerald-600 font-bold">
                <span>Coupon Discount (50%)</span>
                <span className="font-geometric-mono">-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between py-1 text-slate-600">
              <span>GST (18% Statutory Tax)</span>
              <span className="font-geometric-mono font-bold text-slate-900">₹{gst.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-2 text-sm font-black text-slate-900 pt-3">
              <span>Total Payable</span>
              <span className="font-geometric-mono text-blue-600">₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center space-x-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted & Instant GST Invoice</span>
            </p>
            <p>Full refund available within 7 days if not satisfied with learning courseware.</p>
          </div>

          <button
            onClick={handleSimulatePayment}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay ₹{finalTotal.toLocaleString()} via UPI / Cards</span>
          </button>
        </div>
      </div>

      {/* Payment History & Invoices */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tax Invoice History</h3>
            <p className="text-xs text-slate-500">Download GST compliant PDF tax invoices for accounting & reimbursements.</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{paymentHistory.length} Invoices Found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-geometric-mono border-b border-slate-200">
              <tr>
                <th className="p-3">Invoice Number</th>
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-geometric-mono">
              {paymentHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{item.invoiceNumber}</td>
                  <td className="p-3 text-slate-500">{item.date}</td>
                  <td className="p-3 font-sans text-slate-800">{item.description}</td>
                  <td className="p-3 font-bold text-slate-900">₹{item.total.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 font-sans">
                    <button
                      onClick={() => setActiveInvoice(item)}
                      className="inline-flex items-center space-x-1 text-blue-600 font-bold hover:text-blue-800 cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVOICE PREVIEW MODAL */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-geometric-mono text-blue-600 font-bold uppercase">
                  Tax Invoice / Bill of Supply
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{activeInvoice.invoiceNumber}</h3>
                <p className="text-xs text-slate-500">Date: {activeInvoice.date}</p>
              </div>
              <button onClick={() => setActiveInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">Billed To:</p>
                <p className="text-slate-600">{currentUser?.name || 'Priya Sharma'}</p>
                <p className="text-slate-500">{currentUser?.email || 'priya.sharma@example.com'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">Issuer / Supplier:</p>
                <p className="text-slate-600">Jobskül EdTech & Placement Solutions Pvt Ltd</p>
                <p className="text-slate-500 font-geometric-mono">GSTIN: 21AAACJ4892L1Z9 • Bhubaneswar, India</p>
              </div>

              <div className="pt-2 divide-y divide-slate-100">
                <div className="flex justify-between py-1.5 font-semibold text-slate-800">
                  <span>{activeInvoice.planOrCourse}</span>
                  <span className="font-geometric-mono">₹{activeInvoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-500">
                  <span>18% IGST</span>
                  <span className="font-geometric-mono">₹{activeInvoice.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-black text-slate-900">
                  <span>Total Amount Paid</span>
                  <span className="font-geometric-mono text-emerald-600">₹{activeInvoice.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => {
                  showToast('Invoice PDF downloaded to device.');
                  setActiveInvoice(null);
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
