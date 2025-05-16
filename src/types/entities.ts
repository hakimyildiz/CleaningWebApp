export interface Cleaner {
  id: number;
  title: string;
  firstName: string;
  sureName: string;
  email: string;
  mobilePhone: string;
  addressLine: string;
  city: string;
  postCode: string;
  isActive: boolean;
  rate: number;
  registerDate: string;
  gender: string;
  // Other fields can be added as needed
}

export interface Customer {
  id: number;
  title: string;
  firstName: string;
  sureName: string;
  email: string;
  mobilePhone: string;
  addressLine: string;
  city: string;
  postCode: string;
  rate: number;
  // Other fields can be added as needed
}

export interface Agency {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postCode: string;
  rate: number;
  // Other fields can be added as needed
}

export interface Service {
  id: string;
  customerId?: number;
  agencyId?: number;
  agencyStaffId?: number;
  refNo?: string;
  rate: number;
  addressLine: string;
  city: string;
  postCode: string;
  beds: number;
  kitchen: number;
  bathroom: number;
  pet: boolean;
  isActive: boolean;
  // Other fields can be added as needed
}

export interface ServiceRecord {
  id: string;
  serviceId: string;
  customerId?: number;
  agencyId?: number;
  agencyStaffId?: number;
  refNo?: string;
  rate: number;
  addressLine: string;
  city: string;
  postCode: string;
  beds: number;
  kitchen: number;
  bathroom: number;
  pet: boolean;
  recordDate: string;
  workingTime: number;
  status: 'Created' | 'In Cleaning' | 'Cleaned' | 'Invoice Sent' | 'Paid' | 'Canceled';
  // Other fields can be added as needed
}

export interface Invoice {
  id: string;
  serviceRecordId: string;
  invoiceNumber: string;
  customerId?: number;
  agencyId?: number;
  agencyStaffId?: number;
  pdfPath: string;
  total: number;
  status: 'Sent' | 'Paid';
  sentDate: string;
  paidDate?: string;
  // Other fields can be added as needed
}