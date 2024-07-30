import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Addresses
  const address1 = await prisma.address.create({
    data: {
      unit: 'Apt 1B',
      streetLine1: '123 Main St',
      streetLine2: 'Floor 2',
      suburb: 'Downtown',
      postalCode: '12345',
      city: 'Metropolis',
      country: 'Countryland',
    },
  });

  const address2 = await prisma.address.create({
    data: {
      unit: 'Suite 300',
      streetLine1: '456 Elm St',
      streetLine2: null,
      suburb: 'Suburbia',
      postalCode: '67890',
      city: 'Uptown',
      country: 'Countryland',
    },
  });
  const address3 = await prisma.address.create({
    data: {
      unit: 'B2',
      streetLine1: '789 Maple Ave',
      streetLine2: null,
      suburb: 'Greenfield',
      postalCode: '54321',
      city: 'Greenwich',
      country: 'Countryland',
    },
  });

  const address4 = await prisma.address.create({
    data: {
      unit: 'Penthouse',
      streetLine1: '101 Pine St',
      streetLine2: 'Top Floor',
      suburb: 'Old Town',
      postalCode: '11223',
      city: 'Oldville',
      country: 'Countryland',
    },
  });

  const customer1 = await prisma.customer.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '123-456-7890',
      email: 'john.doe@example.com',
      passportNumber: 'A1234567',
      nationality: 'Countryland',
      addressId: address1.id,
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1985-05-15'),
      phoneNumber: '987-654-3210',
      email: 'jane.smith@example.com',
      passportNumber: 'B7654321',
      nationality: 'Countryland',
      addressId: address2.id,
    },
  });
  // Create Customers
  const customer3 = await prisma.customer.create({
    data: {
      firstName: 'Alice',
      lastName: 'Johnson',
      dateOfBirth: new Date('1988-03-12'),
      phoneNumber: '321-654-9870',
      email: 'alice.johnson@example.com',
      passportNumber: 'C2345678',
      nationality: 'Countryland',
      addressId: address3.id,
    },
  });

  const customer4 = await prisma.customer.create({
    data: {
      firstName: 'Bob',
      lastName: 'Williams',
      dateOfBirth: new Date('1992-11-23'),
      phoneNumber: '654-321-0987',
      email: 'bob.williams@example.com',
      passportNumber: 'D8765432',
      nationality: 'Countryland',
      addressId: address4.id,
    },
  });
  const service1 = await prisma.service.create({
    data: {
      customerId: customer1.id,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      customerId: customer2.id,
    },
  });

  // Create Services
  const service3 = await prisma.service.create({
    data: {
      customerId: customer3.id,
    },
  });

  const service4 = await prisma.service.create({
    data: {
      customerId: customer4.id,
    },
  });

  await prisma.visaApplication.createMany({
    data: [
      {
        visaType: 'Tourist',
        applicationDate: new Date('2024-06-01'),
        status: 'Approved',
        serviceId: service1.id,
      },
      {
        visaType: 'Student',
        applicationDate: new Date('2024-07-01'),
        status: 'Pending',
        serviceId: service2.id,
      },
    ],
  });

  // Create Skills Assessments
  await prisma.skillsAssessment.createMany({
    data: [
      {
        assessmentType: 'Technical',
        assessmentDate: new Date('2024-06-15'),
        result: 'Pass',
        serviceId: service1.id,
      },
      {
        assessmentType: 'Language',
        assessmentDate: new Date('2024-07-15'),
        result: 'Fail',
        serviceId: service2.id,
      },
    ],
  });
  // Create Visa Applications
  await prisma.visaApplication.createMany({
    data: [
      {
        visaType: 'Business',
        applicationDate: new Date('2024-08-01'),
        status: 'Approved',
        serviceId: service3.id,
      },
      {
        visaType: 'Tourist',
        applicationDate: new Date('2024-09-01'),
        status: 'Rejected',
        serviceId: service4.id,
      },
    ],
  });

  await prisma.jobReadyProgram.createMany({
    data: [
      {
        programType: 'Full-Time',
        startDate: new Date('2024-05-01'),
        completionDate: new Date('2024-12-01'),
        serviceId: service1.id,
      },
      {
        programType: 'Part-Time',
        startDate: new Date('2024-06-01'),
        completionDate: new Date('2024-11-01'),
        serviceId: service2.id,
      },
    ],
  });
  // Create Skills Assessments
  await prisma.skillsAssessment.createMany({
    data: [
      {
        assessmentType: 'Technical',
        assessmentDate: new Date('2024-08-15'),
        result: 'Pass',
        serviceId: service3.id,
      },
      {
        assessmentType: 'Language',
        assessmentDate: new Date('2024-09-15'),
        result: 'Pass',
        serviceId: service4.id,
      },
    ],
  });

  // Create Job Ready Programs
  await prisma.jobReadyProgram.createMany({
    data: [
      {
        programType: 'Internship',
        startDate: new Date('2024-07-01'),
        completionDate: new Date('2024-12-01'),
        serviceId: service3.id,
      },
      {
        programType: 'Part-Time',
        startDate: new Date('2024-08-01'),
        completionDate: new Date('2024-11-01'),
        serviceId: service4.id,
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
