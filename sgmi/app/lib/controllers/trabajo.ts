import { TrabajoModel, ITrabajo } from '../models/trabajo';

export interface ApiResponse<T> { success: boolean; data?: T; error?: string; message?: string }

export class TrabajoController {
  static async create(role: string, payload: ITrabajo) { if (role !== 'admin') return { success: false, error: 'No autorizado' }; try { const r = await TrabajoModel.create(payload); return { success: true, data: r, message: 'Trabajo creado' } } catch (e: any) { return { success: false, error: e.message } } }

  static async getAll(grupoId?: number) { try { const data = await TrabajoModel.findAll(grupoId); return { success: true, data } } catch (e: any) { return { success: false, error: e.message } } }

  static async getById(id: number) { try { const item = await TrabajoModel.findById(id); if (!item) return { success: false, error: 'No encontrado' }; return { success: true, data: item } } catch (e: any) { return { success: false, error: e.message } } }

  static async update(id: number, role: string, payload: Partial<ITrabajo>) { if (role !== 'admin') return { success: false, error: 'No autorizado' }; try { const updated = await TrabajoModel.update(id, payload); if (!updated) return { success: false, error: 'No se pudo actualizar' }; return { success: true, data: updated } } catch (e: any) { return { success: false, error: e.message } } }

  static async delete(id: number, role: string) { if (role !== 'admin') return { success: false, error: 'No autorizado' }; try { const ok = await TrabajoModel.delete(id); if (!ok) return { success: false, error: 'No encontrado' }; return { success: true, message: 'Eliminado' } } catch (e: any) { return { success: false, error: e.message } } }
}
