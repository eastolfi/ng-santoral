import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type EventReferentialCreation = ({
    title: string;
    day: string;
    month: string;
    country: string;
    type: "HOLIDAY";
} | {
    title: string;
    day: string;
    month: string;
    country: string;
    type: "BIRTHDAY";
})[];

function birthdaysES(): EventReferentialCreation {
    return [
        {
            title: 'Santo de los Pacos',
            day: '04',
            month: '10',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños del tío Fernando',
            day: '11',
            month: '10',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de las Pilis',
            day: '12',
            month: '10',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Eduardos',
            day: '13',
            month: '10',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Paco Eloy',
            day: '21',
            month: '10',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Marga',
            day: '24',
            month: '10',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Mamen y de Pepe Infierno.',
            day: '08',
            month: '11',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de María',
            day: '11',
            month: '11',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de la prima Mari Mar',
            day: '14',
            month: '11',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de las Cecis',
            day: '22',
            month: '11',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Eli y Tavio',
            day: '25',
            month: '11',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de la tía Carmen',
            day: '30',
            month: '11',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de las Elis',
            day: '02',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Javis',
            day: '03',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Susana y Teresa',
            day: '04',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Aniversario de Luis y Carmen (papa y mama)',
            day: '07',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Concha.',
            day: '08',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños Tía Pilar',
            day: '13',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Elisa (facultad).',
            day: '18',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Perico',
            day: '20',
            month: '12',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Eduardo (padre)',
            day: '02',
            month: '01',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Nuevo Cumpleaños de Eduardo (padre)',
            day: '02',
            month: '01',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños del tio Pablo.',
            day: '04',
            month: '01',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de ELVIS',
            day: '08',
            month: '01',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Javi',
            day: '28',
            month: '01',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños del tio Jose',
            day: '03',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Feni',
            day: '08',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños y santo del primo Raúl',
            day: '14',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Pablo (de Andrea)',
            day: '16',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños del primo Fernando',
            day: '17',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Lara',
            day: '18',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de la prima Ceci',
            day: '23',
            month: '02',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Joses',
            day: '19',
            month: '03',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Andrea',
            day: '21',
            month: '03',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Isi',
            day: '21',
            month: '03',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Lola (Toral)',
            day: '23',
            month: '03',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Rocio',
            day: '23',
            month: '03',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo y cumpleaños de la Agüelina',
            day: '31',
            month: '03',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños del primo Jorge',
            day: '07',
            month: '04',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de mamá Eli',
            day: '10',
            month: '04',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Zapa',
            day: '09',
            month: '05',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños del primo Jose Pablo',
            day: '10',
            month: '05',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Santiago (de Andrea)',
            day: '24',
            month: '05',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Fernandos',
            day: '30',
            month: '05',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de papá Luis',
            day: '04',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Cristi',
            day: '10',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de la Infierna',
            day: '11',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Gala',
            day: '15',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Luises',
            day: '21',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Pedros',
            day: '29',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de los Pablos',
            day: '29',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Albertito ',
            day: '29',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de las Carmenes',
            day: '16',
            month: '07',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Luisete',
            day: '03',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Edu (Jr.)',
            day: '08',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Mari Jose.',
            day: '15',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de Jesu',
            day: '29',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de la Chata',
            day: '31',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Santo de María',
            day: '12',
            month: '09',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños de la tía Ceci',
            day: '18',
            month: '09',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños tía Pili (T)',
            day: '29',
            month: '09',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumple Esther',
            day: '29',
            month: '09',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumpleaños Manuel',
            day: '19',
            month: '06',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumple María M.',
            day: '17',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumple Carlos',
            day: '21',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumple Inés',
            day: '23',
            month: '08',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumple Tijana',
            day: '16',
            month: '09',
            country: 'ES',
            type: 'BIRTHDAY'
        },
        {
            title: 'Cumple Tomé',
            day: '16',
            month: '09',
            country: 'ES',
            type: 'BIRTHDAY'
        },
    ]
}

function holidaysES(): EventReferentialCreation {
    return [
        {
            title: 'Año nuevo',
            day: '01',
            month: '01',
            country: 'ES',
            type: 'HOLIDAY',
        },
        {
            title: 'Día del Padre',
            day: '19',
            month: '03',
            country: 'ES',
            type: 'HOLIDAY'
        },
        {
            title: 'Día del trabajo',
            day: '01',
            month: '05',
            country: 'ES',
            type: 'HOLIDAY'
        },
        {
            title: 'Asunción de la Virgen',
            day: '15',
            month: '08',
            country: 'ES',
            type: 'HOLIDAY'
        },
        {
            title: 'Día de la Hispanidad',
            day: '12',
            month: '10',
            country: 'ES',
            type: 'HOLIDAY'
        },
        {
            title: 'Día de Todos los Santos',
            day: '01',
            month: '11',
            country: 'ES',
            type: 'HOLIDAY'
        },
        {
            title: 'Día de la Constitución',
            day: '06',
            month: '12',
            country: 'ES',
            type: 'HOLIDAY'
        },
        {
            title: 'Navidad',
            day: '25',
            month: '12',
            country: 'ES',
            type: 'HOLIDAY'
        },
    ]
}
function holidaysFR(): EventReferentialCreation {
    return [
        {
            title: "Jour de l'an",
            day: '01',
            month: '01',
            country: 'FR',
            type: 'HOLIDAY',
        }
    ]
}

async function main() {
    await prisma.eventReferential.createMany({
        data: [
            ...birthdaysES(),
            ...holidaysES(),
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
