import React, { createContext, useContext, useState } from 'react';

export const translations = {
  src: {
    // Navbar
    home: 'Почетна',
    events: 'Догађаји',
    menu: 'Мени',
    reserve: 'Резервација',
    vip: 'ВИП',
    guestlist: 'Листа Гостију',
    contact: 'Контакт',
    reserveNow: 'Резервиши',
    // Hero
    heroEyebrow: 'Добродошли у',
    heroTitle: 'АНАНАСА ТРИ',
    heroSubtitle: 'Коктел Бар & Трговина',
    heroDesc: 'Где свака ноћ постаје легенда. Премијум коктели, ексклузивна атмосфера и незаборавна музика у срцу Београда.',
    heroLocation: 'Cocktails - Music - Nightlife - Demo venue, Belgrade',
    heroBtn1: 'Резервиши Сто',
    heroBtn2: 'Предстојећи Догађаји',
    heroBtn3: 'ВИП Искуство',
    // Section headings
    contactUs: 'Контактирајте Нас',
    contactSubtitle: 'Имате питање или желите да резервишете? Јавите нам се путем било ког канала.',
    getInTouch: 'Ступите у Контакт',
    workingHours: 'Радно Време',
    // Contact
    location: 'Локација',
  },
  sr: {
    // Navbar
    home: 'Početna',
    events: 'Događaji',
    menu: 'Meni',
    reserve: 'Rezervacija',
    vip: 'VIP',
    guestlist: 'Lista Gostiju',
    contact: 'Kontakt',
    reserveNow: 'Rezerviši',
    // Hero
    heroEyebrow: 'Dobrodošli u',
    heroTitle: 'ANANASA TRI',
    heroSubtitle: 'Koktel Bar & Trgovina',
    heroDesc: 'Gde svaka noć postaje legenda. Premijum kokteli, ekskluzivna atmosfera i nezaboravna muzika u srcu Beograda.',
    heroLocation: 'Cocktails - Music - Nightlife - Demo venue, Belgrade',
    heroBtn1: 'Rezerviši Sto',
    heroBtn2: 'Predstojeći Događaji',
    heroBtn3: 'VIP Iskustvo',
    // Section headings
    contactUs: 'Kontaktirajte Nas',
    contactSubtitle: 'Imate pitanje ili želite da rezervišete? Javite nam se putem bilo kog kanala.',
    getInTouch: 'Stupite u Kontakt',
    workingHours: 'Radno Vreme',
    // Contact
    location: 'Lokacija',
  },
  en: {
    home: 'Home',
    events: 'Events',
    menu: 'Menu',
    reserve: 'Reserve',
    vip: 'VIP',
    guestlist: 'Guest List',
    contact: 'Contact',
    reserveNow: 'Reserve Now',
    heroEyebrow: 'Welcome to',
    heroTitle: 'ANANASA TRI',
    heroSubtitle: 'Cocktail Bar & Shop',
    heroDesc: 'Where every night becomes a legend. Premium cocktails, exclusive atmosphere and unforgettable music in the heart of Belgrade.',
    heroLocation: 'Cocktails - Music - Nightlife - Demo venue, Belgrade',
    heroBtn1: 'Reserve a Table',
    heroBtn2: 'Upcoming Events',
    heroBtn3: 'VIP Experience',
    contactUs: 'Contact Us',
    contactSubtitle: 'Have a question or want to book? Reach out through any channel.',
    getInTouch: 'Get in Touch',
    workingHours: 'Working Hours',
    location: 'Location',
  },
  es: {
    home: 'Inicio',
    events: 'Eventos',
    menu: 'Menú',
    reserve: 'Reservar',
    vip: 'VIP',
    guestlist: 'Lista de Invitados',
    contact: 'Contacto',
    reserveNow: 'Reservar Ahora',
    heroEyebrow: 'Bienvenido a',
    heroTitle: 'ANANASA TRI',
    heroSubtitle: 'Bar de Cócteles & Tienda',
    heroDesc: 'Donde cada noche se convierte en leyenda. Cócteles premium, atmósfera exclusiva y música inolvidable en el corazón de Belgrado.',
    heroLocation: 'Cocktails - Music - Nightlife - Demo venue, Belgrade',
    heroBtn1: 'Reservar Mesa',
    heroBtn2: 'Próximos Eventos',
    heroBtn3: 'Experiencia VIP',
    contactUs: 'Contáctenos',
    contactSubtitle: '¿Tiene alguna pregunta o desea reservar? Contáctenos por cualquier canal.',
    getInTouch: 'Ponerse en Contacto',
    workingHours: 'Horario de Trabajo',
    location: 'Ubicación',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('sr');
  const t = (key) => translations[lang][key] || translations['en'][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}