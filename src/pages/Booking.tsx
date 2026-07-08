import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, Clock, MapPin, ChevronRight, ChevronLeft, User,
  Check, Star, Shield, CreditCard, Zap, ChevronDown, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import BookingStepper from "@/components/BookingStepper";

const steps = [
  { id: 1, label: "Service", description: "Choose type" },
  { id: 2, label: "Schedule", description: "Date & time" },
  { id: 3, label: "Details", description: "Your info" },
  { id: 4, label: "Confirm", description: "Review & pay" },
];

const services = [
  { id: "plumbing", title: "Plumbing", icon: "🔧", startingAt: 75, popular: true },
  { id: "electrical", title: "Electrical", icon: "⚡", startingAt: 90, popular: false },
  { id: "hvac", title: "HVAC & Cooling", icon: "❄️", startingAt: 85, popular: true },
  { id: "repairs", title: "General Repairs", icon: "🔩", startingAt: 65, popular: false },
  { id: "painting", title: "Painting", icon: "🎨", startingAt: 80, popular: false },
  { id: "security", title: "Home Security", icon: "🔒", startingAt: 110, popular: false },
];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM",
];

const pros = [
  {
    id: "marcus",
    name: "Marcus Webb",
    specialty: "Master Electrician",
    rating: 4.9,
    reviews: 284,
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    verified: true,
    hourlyRate: 95,
    jobsDone: 512,
    eta: "25 min",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    specialty: "Licensed Plumber",
    rating: 4.8,
    reviews: 196,
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    verified: true,
    hourlyRate: 80,
    jobsDone: 341,
    eta: "15 min",
  },
];

const generateDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<string | null>("marcus");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);

  const days = generateDays();
  const chosenService = services.find(s => s.id === selectedService);
  const chosenPro = pros.find(p => p.id === selectedPro);

  const serviceFee = chosenService?.startingAt ?? 0;
  const platformFee = 12;
  const discount = 30;
  const total = serviceFee + platformFee - discount;

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return !!selectedDate && !!selectedTime;
    if (currentStep === 3) return address.trim().length > 5;
    return true;
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else setCompleted(true);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-canvas">
        <NavBar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="text-center max-w-md w-full">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "rgba(74,108,143,0.15)", border: "2px solid #4a6c8f" }}
            >
              <Check className="w-10 h-10" style={{ color: "#4a6c8f" }} />
            </div>
            <h2 className="font-sora font-700 text-3xl mb-3" style={{ color: "#e2e8f0" }}>Booking Confirmed!</h2>
            <p className="font-manrope text-base mb-2" style={{ color: "#64748b" }}>
              Your booking with <span style={{ color: "#e2e8f0" }}>{chosenPro?.name}</span> is confirmed.
            </p>
            <div className="swiftly-card p-4 mb-6 text-left mt-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={chosenPro?.avatar} alt={chosenPro?.name} className="w-10 h-10 rounded-xl object-cover" style={{ border: "2px solid rgba(74,108,143,0.4)" }} />
                <div>
                  <div className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>{chosenPro?.name}</div>
                  <div className="font-manrope text-xs" style={{ color: "#4a6c8f" }}>{chosenPro?.specialty}</div>
                </div>
                <div className="ml-auto font-sora font-700 text-base" style={{ color: "#d9a441" }}>${total}</div>
              </div>
              <div className="font-manrope text-xs" style={{ color: "#64748b" }}>
                {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime} · {address}
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/dashboard" className="flex-1">
                <Button className="w-full font-manrope font-600" style={{ backgroundColor: "#4a6c8f", color: "#fff" }}>
                  Track Live
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full font-manrope font-500" style={{ border: "1px solid rgba(74,108,143,0.3)", color: "#94a3b8" }}>
                  Back Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <NavBar />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="font-manrope text-xs uppercase tracking-widest mb-2" style={{ color: "#4a6c8f" }}>Booking Flow</div>
          <h1 className="font-sora font-700 text-2xl xl:text-3xl" style={{ color: "#e2e8f0" }}>Book a Professional</h1>
        </div>

        {/* Stepper */}
        <div className="mb-8 max-w-2xl">
          <BookingStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
        </div>

        {/* Split Pane Layout: 60/40 */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left: 60% — Input Area */}
          <div className="flex-[3] min-w-0">
            <div className="swiftly-card p-6 lg:p-8">
              {/* Step 1: Choose Service */}
              {currentStep === 1 && (
                <div>
                  <h2 className="font-sora font-600 text-xl mb-2" style={{ color: "#e2e8f0" }}>What do you need?</h2>
                  <p className="font-manrope text-sm mb-6" style={{ color: "#64748b" }}>Select a service category to get started.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => setSelectedService(svc.id)}
                        className="relative p-4 rounded-xl text-left transition-all"
                        style={{
                          backgroundColor: selectedService === svc.id ? "rgba(74,108,143,0.15)" : "rgba(74,108,143,0.05)",
                          border: `2px solid ${selectedService === svc.id ? "#4a6c8f" : "rgba(74,108,143,0.15)"}`,
                          boxShadow: selectedService === svc.id ? "0 0 16px rgba(74,108,143,0.2)" : "none",
                        }}
                      >
                        {svc.popular && (
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-manrope font-700 uppercase" style={{ backgroundColor: "rgba(217,164,65,0.15)", color: "#d9a441" }}>Popular</div>
                        )}
                        <div className="text-3xl mb-2">{svc.icon}</div>
                        <div className="font-sora font-600 text-sm mb-0.5" style={{ color: "#e2e8f0" }}>{svc.title}</div>
                        <div className="font-manrope text-xs" style={{ color: "#64748b" }}>From ${svc.startingAt}</div>
                        {selectedService === svc.id && (
                          <div className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4a6c8f" }}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Pro Selection */}
                  <div className="mt-6">
                    <h3 className="font-sora font-600 text-base mb-3" style={{ color: "#e2e8f0" }}>Choose a Professional</h3>
                    <div className="space-y-3">
                      {pros.map((pro) => (
                        <button
                          key={pro.id}
                          onClick={() => setSelectedPro(pro.id)}
                          className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                          style={{
                            backgroundColor: selectedPro === pro.id ? "rgba(74,108,143,0.1)" : "rgba(74,108,143,0.04)",
                            border: `2px solid ${selectedPro === pro.id ? "#4a6c8f" : "rgba(74,108,143,0.15)"}`,
                          }}
                        >
                          <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-xl object-cover shrink-0" style={{ border: "2px solid rgba(74,108,143,0.3)" }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-sora font-600 text-sm" style={{ color: "#e2e8f0" }}>{pro.name}</span>
                              {pro.verified && <Shield className="w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />}
                            </div>
                            <div className="font-manrope text-xs" style={{ color: "#64748b" }}>{pro.specialty}</div>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3" style={{ color: "#d9a441", fill: "#d9a441" }} />
                                <span className="font-manrope text-xs font-600" style={{ color: "#d9a441" }}>{pro.rating}</span>
                              </div>
                              <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{pro.reviews} reviews</span>
                              <span className="font-manrope text-xs" style={{ color: "#64748b" }}>ETA {pro.eta}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-sora font-700 text-base" style={{ color: "#d9a441" }}>${pro.hourlyRate}/hr</div>
                            <div className="font-manrope text-xs" style={{ color: "#64748b" }}>{pro.jobsDone} jobs</div>
                          </div>
                          {selectedPro === pro.id && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#4a6c8f" }}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {currentStep === 2 && (
                <div>
                  <h2 className="font-sora font-600 text-xl mb-2" style={{ color: "#e2e8f0" }}>When should they arrive?</h2>
                  <p className="font-manrope text-sm mb-6" style={{ color: "#64748b" }}>Select a date and preferred time window.</p>

                  {/* Date Picker */}
                  <div className="mb-6">
                    <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Date</div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {days.map((day, i) => {
                        const isSelected = selectedDate?.toDateString() === day.toDateString();
                        const isToday = i === 0;
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(day)}
                            className="flex-shrink-0 flex flex-col items-center p-3 rounded-xl w-16 transition-all"
                            style={{
                              backgroundColor: isSelected ? "#4a6c8f" : "rgba(74,108,143,0.06)",
                              border: `2px solid ${isSelected ? "#4a6c8f" : "rgba(74,108,143,0.15)"}`,
                              boxShadow: isSelected ? "0 0 16px rgba(74,108,143,0.3)" : "none",
                            }}
                          >
                            <span className="font-manrope text-[10px] uppercase" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "#64748b" }}>
                              {day.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="font-sora font-700 text-lg my-0.5" style={{ color: isSelected ? "#fff" : "#e2e8f0" }}>
                              {day.getDate()}
                            </span>
                            {isToday && <span className="font-manrope text-[9px]" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "#d9a441" }}>Today</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Preferred Time</div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className="py-2.5 rounded-lg font-manrope text-sm transition-all"
                            style={{
                              backgroundColor: isSelected ? "#d9a441" : "rgba(74,108,143,0.06)",
                              border: `2px solid ${isSelected ? "#d9a441" : "rgba(74,108,143,0.15)"}`,
                              color: isSelected ? "#10151c" : "#94a3b8",
                              fontWeight: isSelected ? 700 : 400,
                              boxShadow: isSelected ? "0 0 16px rgba(217,164,65,0.3)" : "none",
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {currentStep === 3 && (
                <div>
                  <h2 className="font-sora font-600 text-xl mb-2" style={{ color: "#e2e8f0" }}>Service Location & Notes</h2>
                  <p className="font-manrope text-sm mb-6" style={{ color: "#64748b" }}>Where should the professional go?</p>

                  <div className="space-y-5">
                    <div>
                      <label className="font-manrope text-xs uppercase tracking-wider mb-2 block" style={{ color: "#64748b" }}>Service Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4a6c8f" }} />
                        <Input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="123 Main Street, San Francisco, CA"
                          className="pl-10 font-manrope"
                          style={{ backgroundColor: "rgba(74,108,143,0.06)", border: "1px solid rgba(74,108,143,0.25)", color: "#e2e8f0", height: "48px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-manrope text-xs uppercase tracking-wider mb-2 block" style={{ color: "#64748b" }}>Unit / Apt # (Optional)</label>
                      <Input
                        placeholder="Apt 4B"
                        className="font-manrope"
                        style={{ backgroundColor: "rgba(74,108,143,0.06)", border: "1px solid rgba(74,108,143,0.25)", color: "#e2e8f0", height: "48px" }}
                      />
                    </div>

                    <div>
                      <label className="font-manrope text-xs uppercase tracking-wider mb-2 block" style={{ color: "#64748b" }}>Special Instructions</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Ring the bell twice, access code is 1234, dog in the backyard..."
                        rows={4}
                        className="w-full px-3 py-3 rounded-lg font-manrope text-sm resize-none focus:outline-none"
                        style={{ backgroundColor: "rgba(74,108,143,0.06)", border: "1px solid rgba(74,108,143,0.25)", color: "#e2e8f0" }}
                      />
                    </div>

                    <div>
                      <label className="font-manrope text-xs uppercase tracking-wider mb-2 block" style={{ color: "#64748b" }}>Contact Phone</label>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        className="font-manrope"
                        style={{ backgroundColor: "rgba(74,108,143,0.06)", border: "1px solid rgba(74,108,143,0.25)", color: "#e2e8f0", height: "48px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {currentStep === 4 && (
                <div>
                  <h2 className="font-sora font-600 text-xl mb-2" style={{ color: "#e2e8f0" }}>Review & Confirm</h2>
                  <p className="font-manrope text-sm mb-6" style={{ color: "#64748b" }}>Please review your booking details before confirming.</p>

                  {/* Booking Summary Details */}
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Service", value: chosenService?.title ?? "—" },
                      { label: "Professional", value: chosenPro?.name ?? "—" },
                      { label: "Date", value: selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) ?? "—" },
                      { label: "Time", value: selectedTime ?? "—" },
                      { label: "Address", value: address || "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(74,108,143,0.15)" }}>
                        <span className="font-manrope text-sm" style={{ color: "#64748b" }}>{label}</span>
                        <span className="font-manrope text-sm font-600" style={{ color: "#e2e8f0" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Payment Method</div>
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: "rgba(74,108,143,0.08)", border: "1px solid rgba(74,108,143,0.2)" }}
                    >
                      <div className="w-10 h-7 rounded flex items-center justify-center" style={{ backgroundColor: "#1a1f2e" }}>
                        <CreditCard className="w-5 h-5" style={{ color: "#4a6c8f" }} />
                      </div>
                      <div>
                        <div className="font-manrope text-sm font-600" style={{ color: "#e2e8f0" }}>Visa ending in 4242</div>
                        <div className="font-manrope text-xs" style={{ color: "#64748b" }}>Expires 12/26</div>
                      </div>
                      <button className="ml-auto font-manrope text-xs" style={{ color: "#4a6c8f" }}>Change</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(74,108,143,0.15)" }}>
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="font-manrope font-500"
                  style={{ color: currentStep === 1 ? "#3a4a5c" : "#94a3b8" }}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="font-manrope font-600 glow-cta"
                  style={{
                    backgroundColor: canProceed() ? "#d9a441" : "#2a3645",
                    color: canProceed() ? "#10151c" : "#3a4a5c",
                    padding: "0 28px",
                    height: "44px",
                  }}
                >
                  {currentStep === 4 ? "Confirm Booking" : "Continue"}
                  {currentStep < 4 && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: 40% — Live Summary */}
          <div className="flex-[2] min-w-0">
            <div className="sticky top-24">
              {/* Pro Summary Card */}
              {chosenPro && (
                <div className="swiftly-card p-5 mb-4">
                  <div className="font-sora font-500 text-xs uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>Your Professional</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <img src={chosenPro.avatar} alt={chosenPro.name} className="w-14 h-14 rounded-xl object-cover" style={{ border: "2px solid rgba(74,108,143,0.4)" }} />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#10151c" }}>
                        <Shield className="w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />
                      </div>
                    </div>
                    <div>
                      <div className="font-sora font-600 text-base" style={{ color: "#e2e8f0" }}>{chosenPro.name}</div>
                      <div className="font-manrope text-xs" style={{ color: "#4a6c8f" }}>{chosenPro.specialty}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star className="w-3 h-3" style={{ color: "#d9a441", fill: "#d9a441" }} />
                        <span className="font-manrope text-xs font-600" style={{ color: "#d9a441" }}>{chosenPro.rating}</span>
                        <span className="font-manrope text-xs" style={{ color: "#64748b" }}>({chosenPro.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Rate", value: `$${chosenPro.hourlyRate}/hr` },
                      { label: "Jobs", value: chosenPro.jobsDone.toString() },
                      { label: "ETA", value: chosenPro.eta },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg p-2.5 text-center" style={{ backgroundColor: "rgba(74,108,143,0.08)" }}>
                        <div className="font-sora font-700 text-sm" style={{ color: "#e2e8f0" }}>{value}</div>
                        <div className="font-manrope text-[10px] uppercase tracking-wide" style={{ color: "#64748b" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="swiftly-card p-5">
                <div className="font-sora font-500 text-xs uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>Price Breakdown</div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="font-manrope text-sm" style={{ color: "#94a3b8" }}>
                      {chosenService?.title ?? "Service"} (base rate)
                    </span>
                    <span className="font-manrope text-sm" style={{ color: "#e2e8f0" }}>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-manrope text-sm" style={{ color: "#94a3b8" }}>Platform fee</span>
                    <span className="font-manrope text-sm" style={{ color: "#e2e8f0" }}>${platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-manrope text-sm flex items-center gap-1">
                      <span style={{ color: "#22c55e" }}>First booking discount</span>
                    </span>
                    <span className="font-manrope text-sm" style={{ color: "#22c55e" }}>−${discount}</span>
                  </div>
                </div>

                <div className="flex justify-between py-3 border-t" style={{ borderColor: "rgba(74,108,143,0.2)" }}>
                  <span className="font-sora font-700 text-base" style={{ color: "#e2e8f0" }}>Total</span>
                  <span className="font-sora font-700 text-xl" style={{ color: "#d9a441" }}>${total}</span>
                </div>

                {/* Booking Summary Mini */}
                {(selectedDate || selectedTime || address) && (
                  <div className="mt-4 space-y-2 pt-4 border-t" style={{ borderColor: "rgba(74,108,143,0.15)" }}>
                    <div className="font-sora font-500 text-xs uppercase tracking-wider mb-3" style={{ color: "#64748b" }}>Booking Summary</div>
                    {selectedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />
                        <span className="font-manrope text-xs" style={{ color: "#94a3b8" }}>
                          {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />
                        <span className="font-manrope text-xs" style={{ color: "#94a3b8" }}>{selectedTime}</span>
                      </div>
                    )}
                    {address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" style={{ color: "#4a6c8f" }} />
                        <span className="font-manrope text-xs truncate" style={{ color: "#94a3b8" }}>{address}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Trust Signals */}
                <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: "rgba(74,108,143,0.15)" }}>
                  {["Fully insured & background-checked", "100% satisfaction guarantee", "Transparent pricing, no hidden fees"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "#4a6c8f" }} />
                      <span className="font-manrope text-xs" style={{ color: "#64748b" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}