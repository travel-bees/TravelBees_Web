import { site } from "../data/site";
import type { EnquiryValues } from "./app-context";

const TARGET_EMAIL = site.email; // "info@travelbeesholidays.com"

/**
 * Sends enquiry details directly to info@travelbeesholidays.com using FormSubmit AJAX service.
 * Free, zero setup, no backend required.
 */
export async function sendEnquiryEmail(values: EnquiryValues): Promise<boolean> {
  try {
    const payload = {
      _subject: `New Trip Enquiry: ${values.destination || "Custom Trip"} - ${values.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: values.email || undefined,
      "Customer Name": values.name,
      "Phone / WhatsApp": values.phone,
      "Customer Email": values.email || "Not provided",
      "Destination": values.destination || "Not specified",
      "Trip Type": values.tripType || "Not specified",
      "Travel Dates / Month": values.travelDates || "Flexible",
      "Number of Travellers": values.travelers || "Not specified",
      "Budget per Person": values.budget || "Not specified",
      "Preferences / Requirements": values.requirements || "None",
      "Additional Notes": values.message || "None",
      "Submitted At":
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    };

    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.warn("Failed to send enquiry email:", error);
    return false;
  }
}

/**
 * Sends newsletter/departure update subscriber email to info@travelbeesholidays.com
 */
export async function sendNewsletterEmail(subscriberEmail: string): Promise<boolean> {
  try {
    const payload = {
      _subject: `New Departure Updates / Newsletter Subscriber: ${subscriberEmail}`,
      _template: "table",
      _captcha: "false",
      _replyto: subscriberEmail,
      "Subscriber Email": subscriberEmail,
      "Source": "Website Departure Announcements Form",
      "Subscribed At":
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    };

    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.warn("Failed to send newsletter email:", error);
    return false;
  }
}

