import { Workbook } from 'exceljs';

import { MulterFile } from '../models/request.auth0';
import { ImportEventDto } from '../import/import.service';

const COLUMN_NAME = 2;
const COLUMN_MONTH = 3;
const COLUMN_DAY = 4;

const MONTHS = ['_', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

export class ExcelHelper {
    public static async readXlsx(file: MulterFile): Promise<ImportEventDto[]> {
        const w = new Workbook();

        return await w.xlsx.load(file.buffer)
            .then(w => {
                const s = w.worksheets[0]
                const rows: ImportEventDto[] = []
                s.eachRow((r, i) => {
                    // Skip header
                    if (i === 1) {
                        return;
                    }

                    rows.push({
                        title: r.getCell(COLUMN_NAME).value.toString(),
                        day: `${r.getCell(COLUMN_DAY).result}`.padStart(2, '0'),
                        month: MONTHS.indexOf(r.getCell(COLUMN_MONTH).value.toString().toUpperCase()).toString().padStart(2, '0')
                    })
                })
                return rows;
            });
    }

    public static async readCsv(file: MulterFile): Promise<ImportEventDto[]> {
        const NEW_LINE = '\r\n';
        const SEPARATOR = ',';

        const lines = file.buffer.toString().split(NEW_LINE).map(l => l.trim()).filter(l => l.length > 0);

        const events = lines.slice(1).map(line => line.split(SEPARATOR));

        return events.map(([day, month, title]) => ({
            title,
            day,
            month,
        }));

    }
}
