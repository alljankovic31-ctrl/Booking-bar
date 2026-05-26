import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Phone, MapPin, Clock, Mail } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';

const contactInfo = [
  { icon: Phone, label: 'Booking Channel', value: 'Demo WhatsApp flow' },
  { icon: Instagram, label: 'Instagram', value: '@ananasa.demo' },
  { icon: Mail, label: 'Email', value: 'demo@example.com', href: 'mailto:demo@example.com' },
  { icon: MapPin, label: 'Location', value: 'Demo venue, Belgrade' },
];

const hours = [
  { day: 'Thursday', time: '22:00 - 03:00' },
  { day: 'Friday', time: '22:00 - 04:00' },
  { day: 'Saturday', time: '22:00 - 04:00' },
  { day: 'Sunday', time: 'Closed' },
  { day: 'Mon - Wed', time: 'Private Events Only' },
];

export default function Contact() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Us"
          subtitle="A safe demo contact structure for booking inquiries and hospitality workflows."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="glass rounded-2xl p-5 flex items-center gap-4 hover:glass-gold transition-all duration-300 group block"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="glass rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-primary" />
                <span className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">Working Hours</span>
              </div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="text-foreground font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl h-[400px] lg:h-full min-h-[400px] flex items-center justify-center p-8 text-center"
          >
            <div>
              <MapPin size={36} className="text-primary mx-auto mb-4" />
              <p className="font-heading text-2xl mb-2">Demo Venue Map</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                This portfolio version avoids publishing a private venue address or customer-facing map URL.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}