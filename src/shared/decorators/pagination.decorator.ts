import { createParamDecorator } from '@nestjs/common';
import { AppConstants } from '@constants';

export const Pagination = createParamDecorator((data, req) => {
    let page: number = (req.query.page) ? ((req.query.page > 1) ? req.query.page - 1 : 0) : 0;
    return {
        skip: Number(page) * AppConstants.limitPaginatedData,
        take: AppConstants.limitPaginatedData
    };
});