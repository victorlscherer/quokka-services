import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';

import ServiceProvider from '../../entities/ServiceProvider';

const getAllServiceProviders = async (
    _: Request,
    res: Response,
): Promise<Response> => {
    const serviceProviders =
        await new ServiceProviderRepository().findAllProviders();
    const serviceProvidersWithoutPassword: Array<Partial<ServiceProvider>> = [];

    serviceProviders.forEach((serviceProvider: ServiceProvider) => {
        serviceProvider.condominiumServiceProviders.map((key) => {
            serviceProvider['isApproved'] = key.isApproved;
        });

        const {
            password,
            condominiumServiceProviders,
            ...serviceProtviderAttributes
        } = serviceProvider;

        serviceProvidersWithoutPassword.push(serviceProtviderAttributes);
    });

    return res.status(200).json(serviceProvidersWithoutPassword);
};

export default getAllServiceProviders;
