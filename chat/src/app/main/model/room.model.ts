export interface Room {
    /**
     * ID
     */
    id?: string;
    /**
     * 房间名称
     */
    name?: string;
    /**
     * 房间人数上限
     */
    upperlimit?: number;
    /**
     * 是否加密
     */
    isPassword?: boolean;
    /**
     * 密码
     */
    password?: string;

    /**
     * 创建时间
     */
    timestamp?: number;

    /**
     * 创建人id
     */
    create_id?: number;

    /**
     * 是否可用
     */
    isActive?: boolean;
}
