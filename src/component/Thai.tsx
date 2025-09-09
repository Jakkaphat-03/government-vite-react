// ParliamentMembers.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema validation ด้วย Zod
const MemberSchema = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo: z.any().refine((file) => file?.length === 1, "กรุณาเลือกรูปถ่าย"),
  experience: z.string().min(1, "กรุณากรอกประวัติการทำงาน"),
  achievement: z.string().min(1, "กรุณากรอกผลงานที่ผ่านมา"),
  position: z.string().min(1, "กรุณากรอกตำแหน่งรัฐมนตรี"),
  ministry: z.string().min(1, "กรุณากรอกชื่อกระทรวง"),
  party: z.string().min(1, "กรุณากรอกชื่อพรรคการเมือง"),
});

type Member = z.infer<typeof MemberSchema>;

export default function ParliamentMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Member>({
    resolver: zodResolver(MemberSchema),
  });

  const onSubmit = (data: Member) => {
    const photoFile = (data.photo as FileList)[0];
    const newMember = {
      ...data,
      photo: URL.createObjectURL(photoFile),
    };

    if (editIndex !== null) {
      const updated = [...members];
      updated[editIndex] = newMember;
      setMembers(updated);
      setEditIndex(null);
    } else {
      setMembers([...members, newMember]);
    }
    reset();
  };

  const deleteMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const editMember = (index: number) => {
    const m = members[index];
    reset({
      prefix: m.prefix,
      firstName: m.firstName,
      lastName: m.lastName,
      experience: m.experience,
      achievement: m.achievement,
      position: m.position,
      ministry: m.ministry,
      party: m.party,
    });
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          ทำเนียบสมาชิกสภาผู้แทนราษฎร
        </h1>

        {/* ฟอร์ม */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          noValidate
        >
          <div>
            <label className="block font-semibold">คำนำหน้า</label>
            <select {...register("prefix")} className="w-full border rounded p-2">
              <option value="">เลือกคำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
            {errors.prefix && (
              <p className="text-red-500 text-sm">{errors.prefix.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">ชื่อ</label>
            <input
              {...register("firstName")}
              className="w-full border rounded p-2"
              placeholder="ชื่อ"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">นามสกุล</label>
            <input
              {...register("lastName")}
              className="w-full border rounded p-2"
              placeholder="นามสกุล"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">รูปถ่าย 2 นิ้ว</label>
            <input type="file" {...register("photo")} className="w-full" />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message as string}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">ประวัติการทำงาน</label>
            <textarea
              {...register("experience")}
              className="w-full border rounded p-2"
              rows={2}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">{errors.experience.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">ผลงานที่ผ่านมา</label>
            <textarea
              {...register("achievement")}
              className="w-full border rounded p-2"
              rows={2}
            />
            {errors.achievement && (
              <p className="text-red-500 text-sm">{errors.achievement.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">ตำแหน่งรัฐมนตรี</label>
            <input
              {...register("position")}
              className="w-full border rounded p-2"
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">กระทรวง</label>
            <input {...register("ministry")} className="w-full border rounded p-2" />
            {errors.ministry && (
              <p className="text-red-500 text-sm">{errors.ministry.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">พรรคการเมือง</label>
            <input {...register("party")} className="w-full border rounded p-2" />
            {errors.party && (
              <p className="text-red-500 text-sm">{errors.party.message}</p>
            )}
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {editIndex !== null ? "บันทึกการแก้ไข" : "เพิ่มสมาชิก"}
            </button>
          </div>
        </form>

        {/* รายชื่อ */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">รายชื่อทั้งหมด</h2>
        <ul className="space-y-4">
          {members.map((m, i) => (
            <li
              key={i}
              className="bg-gray-50 border rounded-lg p-4 flex items-start gap-4 shadow"
            >
              <img
                src={m.photo as string}
                alt="รูปถ่าย"
                className="w-20 h-24 object-cover rounded border"
              />
              <div className="flex-1 space-y-1">
                <p className="font-bold text-lg">
                  {m.prefix}
                  {m.firstName} {m.lastName}
                </p>
                <p>พรรค: <span className="font-medium">{m.party}</span></p>
                <p>ตำแหน่ง: {m.position} กระทรวง: {m.ministry}</p>
                <p className="text-sm text-gray-700">ประวัติ: {m.experience}</p>
                <p className="text-sm text-gray-700">ผลงาน: {m.achievement}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => editMember(i)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => deleteMember(i)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
