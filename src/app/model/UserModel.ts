import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  BeforeUpdate, 
  BeforeInsert 
} from "typeorm";
import bcrypt from 'bcryptjs'

@Entity('User')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 30 })
    name: string

    @Column('varchar', { length: 50 })
    email: string

    @Column('varchar', { length: 25 })
    number: string

    @Column('varchar', { length: 20 })
    userName: string

    @Column('varchar', { length: 50 })
    password: string
           
    @BeforeInsert()
    @BeforeUpdate()
    passwordHash(){
      this.password = bcrypt.hashSync(this.password, 8)
    }
       
}
