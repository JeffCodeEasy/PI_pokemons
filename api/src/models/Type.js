const {DataTypes} = require( 'sequelize');

module.exports= (sequelize)=>{
    sequelize.define('type',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: {
                    arg: [5, 30],
                    msg: "Debe contener entre 5 a 30 caracteres"
                }
            }
        }
    }, {timestamps: false})
}