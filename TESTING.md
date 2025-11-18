# 🧪 Testing Checklist

## Before You Start

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5173`
- [ ] MongoDB Atlas connection working
- [ ] Both terminals showing no errors

## 1️⃣ Landing Page

- [ ] Open `http://localhost:5173`
- [ ] See "Healthcare Wellness Portal" heading
- [ ] See two sections: "For Patients" and "For Doctors"
- [ ] All buttons are clickable

## 2️⃣ Patient Registration

- [ ] Click "Patient Sign Up"
- [ ] Fill in the form:
  ```
  First Name: John
  Last Name: Doe
  Email: patient@test.com
  Password: password123
  Phone: 1234567890
  ```
- [ ] Click "Sign Up"
- [ ] Should redirect to Patient Dashboard
- [ ] See welcome message with name

## 3️⃣ Patient Dashboard

- [ ] See three stat cards (Sleep, Water, Exercise)
- [ ] All show 0 initially
- [ ] Click "+ Add Health Record"
- [ ] Add sleep record: 8 hours
- [ ] See sleep updated to 8 hrs
- [ ] Add water record: 6 glasses
- [ ] Add exercise record: 30 minutes
- [ ] All stats should update

## 4️⃣ Logout & Doctor Registration

- [ ] Click "Logout" button
- [ ] Redirected to landing page
- [ ] Click "Doctor Sign Up"
- [ ] Fill in the form:
  ```
  First Name: Sarah
  Last Name: Smith
  Email: doctor@test.com
  Password: password123
  Phone: 9876543210
  Specialization: General Physician
  ```
- [ ] Click "Sign Up"
- [ ] Should redirect to Doctor Dashboard

## 5️⃣ Doctor Dashboard

- [ ] See "Total Patients" = 0
- [ ] See "Today's Appointments" = 0
- [ ] See "My Patients" section (empty)
- [ ] All navigation buttons work

## 6️⃣ Book Appointment (Patient)

- [ ] Logout doctor account
- [ ] Login as patient (patient@test.com / password123)
- [ ] Go to Patient Dashboard
- [ ] Click "Appointments" button
- [ ] Click "+ Book New Appointment"
- [ ] Select Doctor: Dr. Sarah Smith - General Physician
- [ ] Choose tomorrow's date
- [ ] Choose time: 10:00 AM
- [ ] Reason: "Regular checkup"
- [ ] Click "Book Appointment"
- [ ] See success message
- [ ] Appointment appears in list with "scheduled" status

## 7️⃣ View Appointment (Doctor)

- [ ] Logout patient account
- [ ] Login as doctor (doctor@test.com / password123)
- [ ] See "Today's Appointments" count updated (if appointment is today)
- [ ] Click "Appointments" button
- [ ] See appointment in the list
- [ ] See patient name: John Doe
- [ ] See "Complete" and "Cancel" buttons

## 8️⃣ Update Appointment Status

- [ ] Click "Complete" button on appointment
- [ ] Status changes to "completed" (green badge)
- [ ] Try clicking "Cancel" on another appointment
- [ ] Status changes to "cancelled" (red badge)

## 9️⃣ Notifications (Patient)

- [ ] Logout doctor
- [ ] Login as patient
- [ ] Click "Notifications" button
- [ ] Should see appointment notifications
- [ ] Notification badge shows count
- [ ] Click "Mark as read" on one notification
- [ ] Click "Mark all as read"
- [ ] Badge count updates

## 🔟 Notifications (Doctor)

- [ ] Logout patient
- [ ] Login as doctor
- [ ] Click "Notifications" button
- [ ] Should see new appointment notification
- [ ] Mark notifications as read

## 1️⃣1️⃣ View Patients (Doctor)

- [ ] Go to Doctor Dashboard
- [ ] See "My Patients" section
- [ ] Should now show 1 patient (John Doe)
- [ ] See patient's email and phone

## 1️⃣2️⃣ Cross-Browser Testing

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Mobile responsive view (F12 → Toggle device toolbar)

## 1️⃣3️⃣ Error Handling

- [ ] Try logging in with wrong password
- [ ] See error message
- [ ] Try registering with existing email
- [ ] See error message
- [ ] Try booking appointment without selecting doctor
- [ ] Form validation works

## 1️⃣4️⃣ Security Testing

- [ ] Logout
- [ ] Try accessing `/patient/dashboard` directly
- [ ] Should redirect to login page
- [ ] Login as doctor
- [ ] Try accessing `/patient/dashboard`
- [ ] Should be blocked (no access)

## ✅ All Tests Passed?

If all checkboxes are checked, your application is working perfectly! 🎉

## 🐛 Common Issues

**Backend won't start:**
```bash
# Check if MongoDB URI is set in backend/.env
# Make sure MongoDB Atlas IP whitelist includes 0.0.0.0/0
```

**Frontend can't connect:**
```bash
# Make sure backend is running on port 5000
# Check frontend/.env has VITE_API_URL=http://localhost:5000/api
```

**Can't create appointments:**
```bash
# Make sure you registered both a patient and a doctor
# Doctor must be in the database to appear in dropdown
```

**Notifications not showing:**
```bash
# Notifications are created automatically when:
# - Appointment is booked
# - Appointment status changes
```

## 📊 Sample Data

After testing, you should have:
- 2 users (1 patient, 1 doctor)
- 3 patient records (sleep, water, exercise)
- 1-2 appointments
- 4-6 notifications

---

**Happy Testing!** 🧪✨
