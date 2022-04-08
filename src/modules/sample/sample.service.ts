import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService {
    private sampleData: any = [];
    getSampleData() {
        return [...this.sampleData];
    }

    getSampleDataById(id: number) {
        return this.sampleData.find((e: any) => e.id == id);
    }

    addSampleData(data: any) {
        data.id = this.sampleData.length + 1;
        this.sampleData.push(data);
        return data.id;
    }

    updateSampleData(id: number, data: any) {
        let index = this.sampleData.findIndex((e: any) => e.id == id);
        if (index != -1) {
            this.sampleData[index] = {
                id,
                ...data
            };
        }
        return true;
    }

    deleteSampleData(id: number) {
        let index = this.sampleData.findIndex((e: any) => e.id == id);
        if (index != -1) {
            this.sampleData.splice(index, 1);
        }
        return true;
    }
}
