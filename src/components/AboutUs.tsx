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
    name: "Team Member 1",
    role: "Founder & CEO",
    background: "Experienced entrepreneur with a passion for connecting people through innovative rental solutions. Background in technology and business development.",
    image: "https://picsum.photos/seed/team1/150/150",
  },
  {
    name: "Team Member 2",
    role: "CTO",
    background: "Tech visionary with expertise in full-stack development and scalable architecture. Previously led engineering teams at major tech companies.",
    image: "https://picsum.photos/seed/team2/150/150",
  },
  {
    name: "Team Member 3",
    role: "Head of Operations",
    background: "Operations expert with a background in logistics and customer service. Dedicated to ensuring smooth user experiences and efficient processes.",
    image: "https://picsum.photos/seed/team3/150/150",
  },
  {
    name: "Team Member 4",
    role: "Marketing Director",
    background: "Creative marketing strategist with experience in digital campaigns and brand building. Passionate about storytelling and community engagement.",
    image: "https://picsum.photos/seed/team4/150/150",
  },
  {
    name: "Team Member 5",
    role: "Customer Success Manager",
    background: "Customer-focused professional with a background in support and relationship management. Committed to helping users achieve their goals.",
    image: "https://picsum.photos/seed/team5/150/150",
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
                      {member.name.split(' ').map(n => n[0]).join('')} {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                  <p className="text-gray-600 text-center">{member.background}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </div>
  );
}
