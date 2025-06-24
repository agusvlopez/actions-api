import Action from "../schemas/action.js";

class ActionModel {
  static async getAll() {
    try {
      const actions = await Action.find()
      if (!actions) {
        return null
      }
      return actions
    } catch (error) {
      return error
    }
  }

  static async getById(id) {
    try {
      const action = await Action.findById(id)
      if (!action) null
      return action
    } catch (error) {
      return error
    }
  }

  static async create(data) {
    try {
      const newAction = await Action.create(data)
      if (!newAction) null
      return newAction
    } catch (error) {
      return error
    }
  }

  static async update(id, data) {
    try {
      const updatedAction = await Action.findByIdAndUpdate(id, data, { new: true })
      if (!updatedAction) {
        return null
      }
      return updatedAction
    } catch (error) {
      return error
    }
  }

  static async delete(id) {
    try {
      const actionDeleted = await Action.findByIdAndDelete(id)
      if (!actionDeleted) {
        return null
      }
      return actionDeleted
    } catch (error) {
      return error
    }
  }
}

export default ActionModel