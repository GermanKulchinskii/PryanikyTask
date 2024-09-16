import $authApi from "../http/auth.interceptor";

interface PostProps {
    'companySigDate': string,
    'companySignatureName': string,
    'documentName': string,
    'documentStatus': string,
    'documentType': string,
    'employeeNumber': string,
    'employeeSigDate': string,
    'employeeSignatureName': string
}

export default class DocsService {
    static async getDocs () {
        return $authApi.get('/ru/data/v3/testmethods/docs/userdocs/get')
    }
    static async postRecord(record: PostProps) {
        return $authApi.post('/ru/data/v3/testmethods/docs/userdocs/create', record)
    }
    static async deleteRecord(id: string) {
        return $authApi.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`)
    }
    static async setRecord(id: string, record: PostProps) {
        return $authApi.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
            record
        })
    }
}

