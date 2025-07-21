import {
  BooleanEnum,
  QueryKeyTypeEnum,
  RequestStatusEnum,
  TransferMethodEnum,
} from '@app-enums/generic';
import { _UserRoleEnum } from '@app-enums/rolePermissionsEnum';
import { InAppNotificationSendToEnum } from 'src/play-and-win';

/**
 * Enum values for request status.
 */
export const requestStatusVal: readonly [
  RequestStatusEnum.approved,
  RequestStatusEnum.rejected,
] = [RequestStatusEnum.approved, RequestStatusEnum.rejected] as const;

/**
 * Enum values for transfer method.
 */
export const transferMethodVal: readonly [
  TransferMethodEnum.easypaisa,
  TransferMethodEnum.jazzcash,
] = [TransferMethodEnum.easypaisa, TransferMethodEnum.jazzcash] as const;

/**
 * Enum values for selector.
 */
export const selectorEnumVal: readonly [
  QueryKeyTypeEnum.id,
  QueryKeyTypeEnum.roomCode,
] = [QueryKeyTypeEnum.id, QueryKeyTypeEnum.roomCode] as const;

/**
 * Enum values for in-app notification send to.
 */
export const inAppNotificationsSendToEnumVal: readonly [
  InAppNotificationSendToEnum.allUsers,
  InAppNotificationSendToEnum.allAdmins,
  InAppNotificationSendToEnum.allEngagers,
  InAppNotificationSendToEnum.allPlayers,
  InAppNotificationSendToEnum.allEngagersAndPlayers,
  InAppNotificationSendToEnum.specificUsers,
] = [
  InAppNotificationSendToEnum.allUsers,
  InAppNotificationSendToEnum.allAdmins,
  InAppNotificationSendToEnum.allEngagers,
  InAppNotificationSendToEnum.allPlayers,
  InAppNotificationSendToEnum.allEngagersAndPlayers,
  InAppNotificationSendToEnum.specificUsers,
] as const;

/**
 * Enum values for user role.
 */
export const userRoleEnumVal: readonly [
  _UserRoleEnum.superAdmin,
  _UserRoleEnum.admin,
  _UserRoleEnum.manager,
  _UserRoleEnum.editor,
  _UserRoleEnum.creator,
  _UserRoleEnum.reviewer,
  _UserRoleEnum.player,
  _UserRoleEnum.engager,
] = [
  _UserRoleEnum.superAdmin,
  _UserRoleEnum.admin,
  _UserRoleEnum.manager,
  _UserRoleEnum.editor,
  _UserRoleEnum.creator,
  _UserRoleEnum.reviewer,
  _UserRoleEnum.player,
  _UserRoleEnum.engager,
] as const;

/**
 * Enum values for boolean.
 */
export const booleanEnumVal: BooleanEnum[] = [
  BooleanEnum.false,
  BooleanEnum.true,
];
