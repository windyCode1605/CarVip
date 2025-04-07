 
 SELECT `customers`.`customer_id`,
    `customers`.`first_name`,
    `customers`.`last_name`,
    `customers`.`email`,
    `customers`.`phone_number`,
    `customers`.`date_of_birth`,
    `customers`.`gender`,
    `customers`.`address`,
    `customers`.`driver_license_number`,
    `customers`.`driver_license_expiry`,
    `customers`.`membership_status`,
    `customers`.`id_card_number`,
    `customers`.`id_card_issued_date`,
    `customers`.`id_card_issued_by`,
    `customers`.`driver_license_class`,
    `customers`.`driver_license_issued_date`,
    `customers`.`driver_license_issued_by`,
    `customers`.`created_at`,
    `customers`.`updated_at`,
    `customers`.`balance`,
    `customers`.`total_rent`
FROM `carvip1`.`customers`;

