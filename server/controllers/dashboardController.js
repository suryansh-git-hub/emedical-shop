import { getDashboardStatsService } from "../services/dashboardService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStatsService();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};