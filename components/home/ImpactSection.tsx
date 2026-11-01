
import { HeartHandshake, CalendarDays, Leaf } from "lucide-react";

const impacts = [
  {
    icon: HeartHandshake,
    number: "Community",
    title: "People Helping People",
    description: "Building a stronger and kinder community together.",
  },
  {
    icon: CalendarDays,
    number: "Events",
    title: "Meaningful Activities",
    description: "Discover opportunities to make a real difference.",
  },
  {
    icon: Leaf,
    number: "Positive Impact",
    title: "Small Acts Matter",
    description: "Every small action can create a better tomorrow.",
  },
];

export default function ImpactSection() {
  return (
    <section className="bg-[#E8F0E7] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#D18B42]">
            Our Community
          </p>

          <h2 className="text-3xl font-bold text-[#174D38] md:text-4xl">
            Making a Difference Together
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Great things happen when people come together with a shared
            purpose and a caring heart.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {impacts.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0E7] text-[#174D38]">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold text-[#174D38]">
                  {item.number}
                </h3>

                <h4 className="mt-2 font-semibold text-[#24352C]">
                  {item.title}
                </h4>

                <p className="mt-3 leading-7 text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
