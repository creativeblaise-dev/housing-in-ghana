const stats = [
  { id: 1, name: "Monthly readers across web and print", value: "10,000+" },
  {
    id: 2,
    name: "Nationwide distribution points—including hotels, malls, bookshops, gas stations",
    value: "80+",
  },
  {
    id: 3,
    name: "Biannual magazines published and distributed nationwide",
    value: "3 Editions",
  },
  {
    id: 4,
    name: "Featured real estate professionals, projects, and brands",
    value: "200+",
  },
];

const BrandStats = () => {
  return (
    <>
      <div className=" py-4 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 text-gray-400">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
};

export default BrandStats;
