export type Language = 'el' | 'en'
export type Photo = { src: string; alt: Record<Language, string> }

const files = import.meta.glob('../photos/*.{jpg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const photo = (filename: string, el: string, en: string): Photo => ({ src: files[`../photos/${filename}`], alt: { el, en } })

export const galleries = {
  outdoor: [
    photo('outdoor1.jpg', 'Ο κήπος του Miravall με φωτισμένα μονοπάτια και τραπέζια στο ηλιοβασίλεμα', 'Miravall gardens with illuminated paths and reception tables at sunset'),
    photo('outdoor2.jpg', 'Υπαίθρια δεξίωση μπροστά στην πρόσοψη του Miravall', 'An outdoor reception in front of the Miravall building'),
    photo('outdoor3.webp', 'Το κιόσκι και ο φωτισμένος κήπος τη νύχτα', 'The gazebo and illuminated garden at night'),
    photo('outdoor4.webp', 'Φωτισμένο μονοπάτι στον κήπο το σούρουπο', 'An illuminated garden path at dusk'),
    photo('outdoor5.webp', 'Νεόνυμφοι κάτω από πυροτεχνήματα στον εξωτερικό χώρο', 'Newlyweds beneath fireworks in the outdoor venue'),
    photo('outdoor6.webp', 'Στιγμή από γαμήλια γιορτή στον εξωτερικό χώρο του Miravall', 'A wedding celebration in the outdoor venue at Miravall'),
  ],
  indoor: [
    photo('indoor2.webp', 'Γαμήλια δεξίωση με πρώτο χορό στην αίθουσα του Miravall', 'A wedding reception and first dance inside Miravall'),
    photo('indoor3.webp', 'Στολισμένα τραπέζια και φωτισμός στην αίθουσα δεξιώσεων', 'Decorated tables and lighting in the reception hall'),
    photo('indoor4.webp', 'Η εσωτερική αίθουσα του Miravall', 'The indoor hall at Miravall'),
    photo('indoor5.webp', 'Λεπτομέρειες από την εσωτερική αίθουσα δεξιώσεων', 'Details of the indoor reception hall'),
    photo('indoor1.jpg', 'Εσωτερικός διάδρομος σε ροζ αποχρώσεις με διακοσμητικά φυτά', 'A rose-coloured interior corridor with decorative plants'),
    photo('indoor_bar1.jpg', 'Ο χώρος του μπαρ στο Miravall', 'The bar area at Miravall'),
    photo('indoor_bar2.jpg', 'Λεπτομέρεια του εσωτερικού μπαρ', 'A detail of the indoor bar'),
  ],
}

export const content = {
  el: {
    title: 'Miravall | Γάμοι & Δεξιώσεις στη Χαλκιδική',
    description: 'Το Miravall στα Νέα Μουδανιά Χαλκιδικής φιλοξενεί τον γάμο σας: εσωτερική αίθουσα έως 800 ατόμων και θερινός εξωτερικός χώρος έως 700 ατόμων.',
    navigation: 'Κύρια πλοήγηση', navigationItems: ['Το Miravall', 'Οι χώροι', 'Η εμπειρία', 'Επικοινωνία'],
    language: 'Γλώσσα', visit: 'Κλείστε μια επίσκεψη', menu: 'Μενού', close: 'Κλείσιμο', skip: 'Μετάβαση στο περιεχόμενο',
    location: 'ΝΕΑ ΜΟΥΔΑΝΙΑ · ΧΑΛΚΙΔΙΚΗ', venueType: 'Κέντρο δεξιώσεων & γαμήλιων εκδηλώσεων',
    heroFirst: 'Μια μέρα δική σας.', heroSecond: 'Μια ανάμνηση για πάντα.',
    heroDescription: 'Ο χώρος για το δικό σας «για πάντα», στην καρδιά της Χαλκιδικής.', discover: 'Ανακαλύψτε τους χώρους', scroll: 'Ανακαλύψτε',
    aboutLabel: 'ΚΑΛΩΣ ΗΡΘΑΤΕ ΣΤΟ MIRAVALL', aboutFirst: 'Οι άνθρωποί σας.', aboutSecond: 'Η δική σας γιορτή.',
    aboutBody: 'Ένα καλοκαιρινό βράδυ κάτω από τα φώτα του κήπου. Ένας πρώτος χορός στην αίθουσα, με όλους τους αγαπημένους σας κοντά. Στο Miravall, στα Νέα Μουδανιά Χαλκιδικής, ο γάμος σας βρίσκει τον δικό του χώρο.',
    knowUs: 'Ελάτε να γνωριστούμε', indoorCapacity: 'άτομα στον εσωτερικό χώρο', outdoorCapacity: 'άτομα στον θερινό εξωτερικό χώρο', menuChoices: 'επιλογές μενού φαγητού',
    spacesLabel: 'ΟΙ ΧΩΡΟΙ ΜΑΣ', spacesFirst: 'Δύο χώροι.', spacesSecond: 'Η δική σας ιστορία.',
    spacesIntro: 'Επιλέξτε την ατμόσφαιρα που σας εκφράζει. Εμείς σας περιμένουμε να τη γνωρίσετε από κοντά.',
    summer: 'ΚΑΛΟΚΑΙΡΙ ΣΤΟΝ ΚΗΠΟ', indoors: 'ΣΤΗΝ ΑΙΘΟΥΣΑ',
    outdoorTitle: 'Κάτω από τον ουρανό.', outdoorBody: 'Το ηλιοβασίλεμα, το πράσινο και οι γιρλάντες φωτός γίνονται το σκηνικό της καλοκαιρινής σας δεξίωσης. Ένας εξωτερικός χώρος για να γιορτάσετε μαζί με έως 700 αγαπημένους σας.',
    indoorTitle: 'Μαζί, σε κάθε στιγμή.', indoorBody: 'Η εσωτερική αίθουσα του Miravall φιλοξενεί έως 800 καλεσμένους. Από το πρώτο καλωσόρισμα μέχρι τον τελευταίο χορό, όλη η γιορτή συναντιέται εδώ.', upToGuests: 'καλεσμένοι έως',
    momentLabel: 'Ο ΓΑΜΟΣ ΣΑΣ ΣΤΟ MIRAVALL', momentFirst: 'Για τις στιγμές', momentSecond: 'που μένουν.', plan: 'Ας σχεδιάσουμε τη μέρα σας',
    experienceLabel: 'Η ΕΜΠΕΙΡΙΑ', experienceFirst: 'Η γιορτή σας,', experienceSecond: 'όπως τη φαντάζεστε.', experienceIntro: 'Ξεκινήστε με όσα περιλαμβάνονται και επιλέξτε τις επιπλέον υπηρεσίες που ταιριάζουν στη δική σας δεξίωση.',
    included: 'ΠΕΡΙΛΑΜΒΑΝΟΝΤΑΙ', menuTitle: 'Τρεις επιλογές μενού', menuBody: 'Επιλέξτε ανάμεσα σε τρία μενού φαγητού. Επικοινωνήστε μαζί μας για να γνωρίσετε τις επιλογές.', lighting: 'Φωτισμός', lightingBody: 'Ο φωτισμός του χώρου περιλαμβάνεται στη δεξίωσή σας.', optional: 'ΠΡΟΑΙΡΕΤΙΚΕΣ ΥΠΗΡΕΣΙΕΣ',
    services: [{ title: 'Ηχητική κάλυψη', body: 'Ο ήχος που συνοδεύει τη γιορτή σας.' }, { title: 'Ζωντανή μπάντα', body: 'Ζωντανή μουσική για τη δική σας βραδιά.' }, { title: 'Μπαρ', body: 'Μια επιπλέον επιλογή για τη δεξίωσή σας.' }],
    contactLabel: 'ΑΣ ΓΝΩΡΙΣΤΟΥΜΕ', contactFirst: 'Όλα ξεκινούν', contactSecond: 'με μια συνάντηση.', contactBody: 'Πείτε μας για τη μέρα που ονειρεύεστε. Επικοινωνήστε μαζί μας για διαθεσιμότητα, πληροφορίες ή μια επίσκεψη στο Miravall.', address: 'Νέα Μουδανιά, Χαλκιδική 632 00',
    name: 'Ονοματεπώνυμο', date: 'Ημερομηνία εκδήλωσης', guests: 'Αριθμός καλεσμένων', message: 'Λίγα λόγια για τη γιορτή σας', emailButton: 'Ετοιμάστε το email σας', emailSubject: 'Ενδιαφέρον για δεξίωση στο Miravall',
    formNote: '* Υποχρεωτικά πεδία. Ανοίγει η εφαρμογή email σας με έτοιμο μήνυμα. Δεν αποστέλλεται αυτόματα.', emailPrepared: 'Το email ετοιμάστηκε. Αν δεν άνοιξε η εφαρμογή σας, γράψτε μας στο ktima.miravall@hotmail.com. Δεν έχει σταλεί μήνυμα από τον ιστότοπο.',
    directions: 'Οδηγίες πρόσβασης', footerNote: 'Οι πιο όμορφες στιγμές μοιράζονται.', backTop: 'Επιστροφή στην αρχή', photo: 'Φωτογραφία', previous: 'Προηγούμενη φωτογραφία', next: 'Επόμενη φωτογραφία', enlarge: 'Μεγέθυνση φωτογραφίας', carousel: 'Συλλογή φωτογραφιών',
  },
  en: {
    title: 'Miravall | Weddings & Receptions in Halkidiki',
    description: 'Celebrate your wedding at Miravall in Nea Moudania, Halkidiki. An indoor hall for up to 800 guests and a summer outdoor venue for up to 700.',
    navigation: 'Main navigation', navigationItems: ['About Miravall', 'The spaces', 'The experience', 'Contact'], language: 'Language', visit: 'Book a viewing', menu: 'Menu', close: 'Close', skip: 'Skip to content',
    location: 'NEA MOUDANIA · HALKIDIKI', venueType: 'Wedding & reception venue', heroFirst: 'A day of your own.', heroSecond: 'A memory for always.', heroDescription: 'A setting for your forever, in the heart of Halkidiki.', discover: 'Discover the spaces', scroll: 'Explore',
    aboutLabel: 'WELCOME TO MIRAVALL', aboutFirst: 'Your favourite people.', aboutSecond: 'Your kind of celebration.', aboutBody: 'A summer evening beneath the garden lights. A first dance in the hall, surrounded by everyone you love. At Miravall, in Nea Moudania, Halkidiki, your wedding finds its own setting.', knowUs: 'Come and meet us', indoorCapacity: 'guests in our indoor venue', outdoorCapacity: 'guests in our summer garden', menuChoices: 'food menu choices',
    spacesLabel: 'OUR SPACES', spacesFirst: 'Two settings.', spacesSecond: 'Your own story.', spacesIntro: 'Choose the atmosphere that feels like you. We look forward to showing you around.', summer: 'SUMMER IN THE GARDEN', indoors: 'INSIDE THE HALL',
    outdoorTitle: 'Beneath the open sky.', outdoorBody: 'Sunset, greenery and strings of light set the scene for your summer reception. An outdoor setting to celebrate with up to 700 of your favourite people.', indoorTitle: 'Together, for every moment.', indoorBody: 'Miravall’s indoor hall welcomes up to 800 guests. From the first welcome to the last dance, this is where your celebration comes together.', upToGuests: 'guests, maximum',
    momentLabel: 'YOUR WEDDING AT MIRAVALL', momentFirst: 'For the moments', momentSecond: 'that stay with you.', plan: 'Let’s plan your day',
    experienceLabel: 'THE EXPERIENCE', experienceFirst: 'Your celebration,', experienceSecond: 'just as you imagine.', experienceIntro: 'Start with what’s included, then choose the extra services that suit your reception.', included: 'INCLUDED', menuTitle: 'Three menu choices', menuBody: 'Choose from three food menus. Get in touch to explore the options with us.', lighting: 'Lighting', lightingBody: 'Venue lighting is included in your reception.', optional: 'OPTIONAL SERVICES',
    services: [{ title: 'Sound', body: 'Sound to accompany your celebration.' }, { title: 'Live band', body: 'Live music for your special evening.' }, { title: 'Bar', body: 'An extra option for your reception.' }],
    contactLabel: 'LET’S MEET', contactFirst: 'It all begins', contactSecond: 'with a conversation.', contactBody: 'Tell us about the day you have in mind. Get in touch for availability, more information or a viewing at Miravall.', address: 'Nea Moudania, Halkidiki 632 00', name: 'Full name', date: 'Event date', guests: 'Number of guests', message: 'Tell us about your celebration', emailButton: 'Prepare your email', emailSubject: 'Wedding reception enquiry at Miravall', formNote: '* Required fields. Opens your email app with a prepared message. Nothing is sent automatically.', emailPrepared: 'Your email is prepared. If your email app didn’t open, write to ktima.miravall@hotmail.com. No message has been sent by this website.', directions: 'Get directions', footerNote: 'The best moments are shared.', backTop: 'Back to top', photo: 'Photo', previous: 'Previous photo', next: 'Next photo', enlarge: 'Enlarge photo', carousel: 'Photo carousel',
  },
}
