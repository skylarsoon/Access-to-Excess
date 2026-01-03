import { useState } from "react";

export default function MailingListSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/mailinglist-subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: phone || "",
            role: "recipient",
          }),
        }
      );

      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.error);

      setStatus("success");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setErrors({});
    } catch (err) {
      setStatus("error");
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 bg-white border rounded-md text-sm focus:outline-none transition-colors ${hasError
      ? "border-red-500 focus:border-red-500"
      : "border-gray-200 focus:border-black"
    }`;

  const clearError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <div className="animate-fade-in bg-stone-50 min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-black mb-3">Mailing List Signup</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Stay updated with our latest food rescue events, community news, and opportunities to get involved.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                placeholder=""
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearError("firstName");
                }}
                className={inputClass(errors.firstName)}
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                placeholder=""
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearError("lastName");
                }}
                className={inputClass(errors.lastName)}
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              className={inputClass(errors.email)}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              placeholder=""
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                clearError("phone");
              }}
              className={inputClass(errors.phone)}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-[#0f172a] text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 mt-4"
          >
            {status === "loading" ? "Submitting..." : "Sign Up"}
          </button>

          {status === "success" && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-md text-center">
              <p className="text-sm text-emerald-700 font-medium">
                Successfully signed up! Thank you for joining us.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-md text-center">
              <p className="text-sm text-red-700 font-medium">
                Something went wrong. Please check your inputs and try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
