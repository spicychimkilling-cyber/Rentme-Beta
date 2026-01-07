import { Card, CardContent } from './ui/card';
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  background: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Pema Wangchuk",
    role: "Team Lead",
    background: "B. Com in Accounts. Responsible for finance and operations.",
    image: "https://picsum.photos/seed/pema/150/150",
  },
  {
    name: "Sonam Tshering",
    role: "Accountant",
    background: "PGD in Entrepreneurial Leadership. Responsible for operations and company compliance.",
    image: "https://picsum.photos/seed/sonam/150/150",
  },
  {
    name: "Tshering Tobgay",
    role: "Finance & Operations",
    background: "B. Com in Finance. Responsible for finance and operational activities.",
    image: "https://picsum.photos/seed/tshering/150/150",
  },
  {
    name: "Sonam Choden",
    role: "Web Developer",
    background: "B.sc Tech in Computer Science and Engineering. Specializes in web development.",
    image: "https://picsum.photos/seed/sonamc/150/150",
  },
  {
    name: "Sangay Yonten",
    role: "Customer Relations & Operations",
    background: "Master in Sustainable Development. Handles customer relations and operational tasks.",
    image: "https://picsum.photos/seed/sangay/150/150",
  },
];

export function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate team behind RentMe, dedicated to revolutionizing the way people rent and share items in their communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                  <p className="text-gray-600 text-center">{member.background}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
