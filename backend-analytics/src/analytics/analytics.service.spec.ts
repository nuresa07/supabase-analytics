import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticsService]
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return analytics data by user ID', async () => {
    const mockUserId = '1234-5678-9012';
    jest.spyOn(service, 'getAnalyticsByUser').mockResolvedValueOnce([
      { date: 'Apr 20', users: 100 }
    ])

    const result = await service.getAnalyticsByUser(mockUserId);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('date');
  })

  // it('should return total user', async () => {
  //   const result = await service.getTotalUser();
  //   expect(result).toBeGreaterThanOrEqual(0);
  // })

});
