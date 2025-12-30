import { useState } from "react";

export default function MailingListSignup() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("recipient");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/mailinglist-subscribe', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();
      setStatus(data.message || "Success!");
      setEmail("");
    } catch (err) {
      setStatus("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">MailingList Signup</h2>

      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border p-2"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="recipient">Recipient</option>
        <option value="volunteer">Volunteer</option>
        <option value="donor">Donor</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Sign up
      </button>

      {status && (
        <p className="text-sm text-gray-600">{status}</p>
      )}
    </form>
  );
}