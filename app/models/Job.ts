/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

// Define the Job status enum
export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';

// Define the attributes interface
export interface JobAttributes {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  applicationDate: Date;
  jobUrl?: string;
  notes?: string;
  salary?: string;
  location?: string;
  contactEmail?: string;
  followUpDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Define creation attributes (optional fields for creation)
export interface JobCreationAttributes extends Optional<JobAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

// Define the Job model class
export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public company!: string;
  public position!: string;
  public status!: JobStatus;
  public applicationDate!: Date;
  public jobUrl?: string;
  public notes?: string;
  public salary?: string;
  public location?: string;
  public contactEmail?: string;
  public followUpDate?: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;

  // Static method to initialize the model
  static initModel(sequelize: Sequelize): typeof Job {
    Job.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        company: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        position: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('applied', 'interview', 'offer', 'rejected', 'withdrawn'),
          allowNull: false,
          defaultValue: 'applied',
        },
        applicationDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        jobUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        salary: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        contactEmail: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        followUpDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Job',
        tableName: 'jobs',
        timestamps: true,
        paranoid: true,
        indexes: [
          {
            unique: true,
            fields: ['position'],
          },
        ],
        // hooks: {
        //   // Add hooks here if needed
        // }
      }
    );

    return Job;
  }
}

// Factory function for compatibility with existing patterns
export const JobFactory = (sequelize: Sequelize): typeof Job => {
  return Job.initModel(sequelize);
};

export default Job;