import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Building2, Calculator, FileCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout';

const stats = [
  { value: '10+', label: 'Partner Lenders' },
  { value: '₦10M+', label: 'Loan Options Available' },
  { value: '100%', label: 'Free to Apply' },
  { value: '24/7', label: 'Application Tracking' },
];

const features = [
  { icon: FileCheck, title: 'One Application', desc: 'Apply once, reach all major Nigerian lenders instantly' },
  { icon: Calculator, title: 'Smart Comparison', desc: 'Compare rates, fees, and terms across 25+ products' },
  { icon: Shield, title: 'Secure KYC', desc: 'Verify once, share securely with consent-based access' },
  { icon: Clock, title: 'Real-Time Tracking', desc: 'Track your application status from submission to keys' },
];

export default function Index() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20 z-10" />
          <img src="/hero-bg.png" alt="Luxury Home" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-20 mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30">
                <span className="text-sm font-medium">🇳🇬 Nigeria's #1 Mortgage Marketplace</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Dream Home,{' '}
                <span className="text-primary">One Application</span> Away
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Compare mortgage products from top Nigerian banks and PMBs. Apply once, get matched instantly, and track your journey to homeownership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 px-8">
                  <Link to="/apply">
                    Start Your Application <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
                  <Link to="/calculator">Check Affordability</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Join</span> the growing community of smart homebuyers
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-card rounded-2xl shadow-xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold">Example Estimate</h3>
                    <span className="text-xs text-muted-foreground">Preview</span>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Property Value</p>
                      <p className="text-2xl font-bold">₦35,000,000</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground">You could borrow up to</p>
                      <p className="text-3xl font-bold text-primary">₦28,000,000</p>
                      <p className="text-sm text-muted-foreground mt-1">From ₦186,000/month</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>12 lenders match your profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-secondary">{stat.value}</p>
                <p className="text-sm text-primary-foreground/80 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Why Choose MortgageNG?</h2>
            <p className="text-muted-foreground">We're revolutionizing how Nigerians access mortgage financing.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card rounded-xl border card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Own Your Home?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of Nigerians who found their perfect mortgage match.
          </p>
          <Button asChild size="lg" className="h-14 px-8 text-lg">
            <Link to="/apply">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
