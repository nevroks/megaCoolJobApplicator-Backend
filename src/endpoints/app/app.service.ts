import { Injectable } from '@nestjs/common';

type textBlockType = {
    img?: string;
    text: string;
    list?: string[]
}

export type AppConfig = {
    configVersion: number;
    isAppAvailable: boolean;
    appVersion: string;
    plannedUpdate: {
        title: string;
        textSettings: {
            textsBlocks: "singleBlock" | "doubleBlock";
        },
        firstBlock: textBlockType
        secondBlock?: textBlockType
    };
}

const appConfig: AppConfig = {
    configVersion: 0,
    isAppAvailable: true,
    appVersion: '1.0.0',
    plannedUpdate: {
        textSettings: {
            textsBlocks: "singleBlock"
        },
        title: "Ближайшие планы...",
        firstBlock: {
            img: "https://amicus-vet.ru/images/statii/a582d6cs-960.jpg",
            text: "text",
            list: [
                "план 1",
                "план 2"
            ]
        }
    }
}

@Injectable()
export class AppService {
    
    getAppConfig(): AppConfig {
        return appConfig;
    }
}
