import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Bell, UserCircle, Calendar, BarChart2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const popularHabits = [
  { name: 'Daily Exercise', icon: '🏋️' },
  { name: 'Read 30 Minutes', icon: '📚' },
  { name: 'Meditate', icon: '🧘' },
  { name: 'Drink water', icon: '💧' },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-center">{icon}</CardTitle>
    </CardHeader>
    <CardContent>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

interface HabitCardProps {
  name: string;
  progress: number;
  streak: number;
}

const HabitCard: React.FC<HabitCardProps> = ({ name, progress, streak }) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <Progress value={progress} className="w-full" />
      <p className="mt-2">Progress: {progress}%</p>
      <p>Current streak: {streak} days</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline">Mark as Complete</Button>
    </CardFooter>
  </Card>
);

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'habits' | 'stats'>('overview');
  const [user, setUser] = useState<any>(null); // Estado para almacenar la información del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!storedUser || !storedUser.name) {
      // Si no hay usuario, redirige al login
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">Process</div>
            <div>
              <Button variant="ghost" className="mr-2" onClick={() => navigate('/login')}>
                Log Out
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h1>
          <p className="text-xl text-gray-600 mb-8">You're logged in and ready to track your habits.</p>
          <Button size="lg" onClick={() => navigate('/register')}>
            Start New Habit <ArrowRight className="ml-2" />
          </Button>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Main features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Check className="w-12 h-12 text-green-500" />}
              title="Habit Record"
              description="Easily add and manage your daily, weekly or monthly habits."
            />
            <FeatureCard
              icon={<Bell className="w-12 h-12 text-blue-500" />}
              title="Notifications"
              description="Receive personalized reminders to keep your habits on track."
            />
            <FeatureCard
              icon={<UserCircle className="w-12 h-12 text-purple-500" />}
              title="Custom Profile"
              description="View your progress and personalize your experience."
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Habits</CardTitle>
                <div>
                  <Button variant="outline" className="mr-2" onClick={() => setActiveTab('overview')}>
                    <Calendar className="mr-2 h-4 w-4" /> Overview
                  </Button>
                  <Button variant="outline" className="mr-2" onClick={() => setActiveTab('habits')}>
                    <Check className="mr-2 h-4 w-4" /> Habits
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('stats')}>
                    <BarChart2 className="mr-2 h-4 w-4" /> Stats
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <HabitCard name="Daily Exercise" progress={75} streak={5} />
                  <HabitCard name="Read 30 Minutes" progress={60} streak={3} />
                  <HabitCard name="Meditate" progress={90} streak={10} />
                  <HabitCard name="Drink Water" progress={80} streak={7} />
                </div>
              )}
              {activeTab === 'habits' && (
                <div>
                  <Button className="mb-4">
                    <Plus className="mr-2 h-4 w-4" /> Add New Habit
                  </Button>
                </div>
              )}
              {activeTab === 'stats' && (
                <div>
                  <p>Detailed statistics and charts would go here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular habits</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularHabits.map((habit, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="text-4xl mb-2">{habit.icon}</span>
                  <p className="text-gray-800 font-medium">{habit.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Process. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserPage;
