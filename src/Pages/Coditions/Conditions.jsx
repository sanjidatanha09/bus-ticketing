import { FaHandPointRight } from "react-icons/fa";

const Conditions = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-primary3 text-center mt-2">
          আমাদের শর্তাবলী
        </h1>
        <div className="mt-5 border border-primary3 rounded-md p-3">
          <ul className="space-y-2">
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              টিকেটটি অবশ্যই প্রিন্ট করে আনতে হবে।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              যাত্রার ২৪-৪৮ ঘন্টা পূর্বে বাস নাম্বার, গাইডের নাম ও নাম্বার ও সকল
              তথ্য মেসেজ করা হবে। তাই মোবাইল নাম্বারটি সতর্কতার সাথে দিবেন এবং
              সবসময় সচল রাখবেন।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              টিকেট ফেরতযোগ্য এবং হস্তান্তরযোগ্য নয়।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              যাত্রার ৩০ মিনিট পূর্বে যথাস্থানে উপস্থিত থাকতে হবে।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              যাত্রাকালে ধুমপান নিষেধ।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              যাত্রায় কোনো প্রকার দূর্ঘটনাজনিত বীমা অন্তর্ভুক্ত নয়।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              বাস কুমিল্লা ও সিরাজগঞ্জে বিরতি দিবে।(শুধুমাত্র রাজশাহী
              বিশ্ববিদ্যালয়ের ক্ষেত্রে)
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              কর্তৃপক্ষ যেকোনো পারিপার্শ্বিক বিবেচনায় যাত্রা শুরুর স্থান
              পরিবর্তন করতে পারে এবং এই পরিবর্তনের খবর যাওয়ার কমপক্ষে ২৪-৪৮
              ঘন্টা পূর্বে মেসেজ করে জানিয়ে দেওয়া হবে।
            </li>
            <li className="flex gap-3 items-start">
              <FaHandPointRight className="text-primary3 mt-1" />
              অবৈধ মালামাল বহনে কর্তৃপক্ষ দায়ী না, কোনো বিরুপ পরিস্থিতিতে আইনশৃঙ্খলা বাহিনী কে কর্তৃপক্ষ সর্বাত্মক সহযোগিতা করবে।
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
