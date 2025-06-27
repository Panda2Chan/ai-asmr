import axios from 'axios';
import { Veo3ApiRequest, Veo3ApiResponse } from '@/types';

class Veo3Client {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.VEO3_API_KEY!;
    this.baseUrl = process.env.VEO3_API_URL!;
  }

  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      const response = await axios({
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      return response.data;
    } catch (error: any) {
      console.error('VEO3 API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'VEO3 API 请求失败');
    }
  }

  /**
   * 生成 ASMR 视频
   */
  async generateVideo(params: Veo3ApiRequest): Promise<Veo3ApiResponse> {
    return this.request<Veo3ApiResponse>('/generate', {
      method: 'POST',
      data: params,
    });
  }

  /**
   * 获取视频生成状态
   */
  async getVideoStatus(videoId: string): Promise<Veo3ApiResponse> {
    return this.request<Veo3ApiResponse>(`/status/${videoId}`);
  }

  /**
   * 取消视频生成
   */
  async cancelVideo(videoId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/cancel/${videoId}`, {
      method: 'POST',
    });
  }

  /**
   * 获取支持的风格列表
   */
  async getStyles(): Promise<string[]> {
    return this.request<string[]>('/styles');
  }

  /**
   * 获取支持的音频类型列表
   */
  async getAudioTypes(): Promise<string[]> {
    return this.request<string[]>('/audio-types');
  }
}

export const veo3Client = new Veo3Client();
export default veo3Client; 