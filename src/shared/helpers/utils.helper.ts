import * as Excel from 'exceljs';
import { Column, Row } from 'exceljs';
import * as moment from 'moment';

export class UtilsHelper {
    /**
     * Generate excel worksheet with passed data(columns and rows)
     * @param res Express response 
     * @param columns Array of column keys
     * @param rows Array of rows data
     * @param name Name of WorkSheet and export file
     */
    static generateExcel(res, columns, rows, name: string) {
        const filteredColumns = columns.filter(item => item !== '_id' && item !== '__v');
        let workbook = new Excel.Workbook();

        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ];
        let worksheet = workbook.addWorksheet(name);

        let columnsData: Array<Partial<Column>> = [];

        filteredColumns.forEach((attr) => {
            columnsData.push({ header: attr, key: attr, width: 32 })
        });

        worksheet.columns = columnsData;

        rows.forEach(row => {
            let rowObj = {};
            filteredColumns.forEach((attr) => {
                rowObj[attr] = (attr == 'date') ? moment(row[attr]).format('DD-MM-YYYY, HH:mm') : row[attr];
            });
            worksheet.addRow(rowObj);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + name + '.xlsx');
        return workbook.xlsx.write(res)
            .then((data) => {
                res.end();
            });
    }

}